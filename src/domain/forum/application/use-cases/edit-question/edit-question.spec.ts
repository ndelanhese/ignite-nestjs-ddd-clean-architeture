import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { faker } from "@faker-js/faker";
import { makeQuestion } from "@test-factories/make-question";
import { makeQuestionAttachment } from "@test-factories/make-question-attachments";
import { InMemoryQuestionAttachmentsRepository } from "@test-repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit a question", () => {
	beforeEach(() => {
		inMemoryQuestionsAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionsAttachmentsRepository,
		);
		sut = new EditQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionsAttachmentsRepository,
		);
	});

	it("should be able to edit a question", async () => {
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

		const fakeQuestionContent = faker.lorem.text();
		const fakeQuestionTitle = faker.lorem.sentence();
		await sut.execute({
			authorId: authorId.toString(),
			questionId: questionId.toString(),
			content: fakeQuestionContent,
			title: fakeQuestionTitle,
			attachmentsIds: ["1", "3"],
		});

		const foundedQuestion = await inMemoryQuestionsRepository.findById(
			questionId.toString(),
		);

		expect(foundedQuestion).toMatchObject({
			title: fakeQuestionTitle,
			content: fakeQuestionContent,
		});
		expect(foundedQuestion?.attachments.compareItems).toHaveLength(2);
		expect(foundedQuestion?.attachments.currentItems).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
			expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
		]);
	});

	it("should not be able to edit a question from another author", async () => {
		const authorId = new UniqueEntityId("question-author");
		const questionId = new UniqueEntityId("question-id");
		const { newQuestion } = makeQuestion({ authorId }, questionId);

		await inMemoryQuestionsRepository.create(newQuestion);

		const fakeQuestionContent = faker.lorem.text();
		const fakeQuestionTitle = faker.lorem.sentence();

		const result = await sut.execute({
			authorId: "wrong-author-id",
			questionId: questionId.toString(),
			content: fakeQuestionContent,
			title: fakeQuestionTitle,
			attachmentsIds: ["9"],
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
