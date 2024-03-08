import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { makeQuestion } from "@test-factories/make-question";
import { makeQuestionAttachment } from "@test-factories/make-question-attachments";
import { InMemoryQuestionAttachmentsRepository } from "@test-repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { expect } from "vitest";
import { DeleteQuestionUseCase } from "./delete-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete a question", () => {
	beforeEach(() => {
		inMemoryQuestionsAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionsAttachmentsRepository,
		);
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to delete a question", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		const { newQuestionAttachment: firstAttachment } = makeQuestionAttachment({
			attachmentId: new UniqueEntityId("1"),
			questionId,
		});

		const { newQuestionAttachment: secondAttachment } = makeQuestionAttachment({
			attachmentId: new UniqueEntityId("2"),
			questionId,
		});

		inMemoryQuestionsAttachmentsRepository.items.push(
			firstAttachment,
			secondAttachment,
		);

		await sut.execute({
			authorId: authorId.toString(),
			questionId: questionId.toString(),
		});

		const hasItemInMemory = await inMemoryQuestionsRepository.findById(
			questionId.toString(),
		);
		const hasAttachmentInMemory =
			inMemoryQuestionsAttachmentsRepository.items.length > 0;

		expect(hasItemInMemory).toBeNull();
		expect(hasAttachmentInMemory).toBeFalsy();
	});

	it("should not be able to delete a question from another author", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			authorId: "wrong-author-id",
			questionId: questionId.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
