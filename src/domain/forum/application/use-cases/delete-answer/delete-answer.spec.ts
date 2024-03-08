import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { makeAnswer } from "@test-factories/make-answer";
import { makeAnswerAttachment } from "@test-factories/make-answer-attachments";
import { InMemoryAnswerAttachmentsRepository } from "@test-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe("Delete an answer", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it("should be able to delete an answer", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		const { newAnswerAttachment: firstAttachment } = makeAnswerAttachment({
			attachmentId: new UniqueEntityId("1"),
			answerId,
		});

		const { newAnswerAttachment: secondAttachment } = makeAnswerAttachment({
			attachmentId: new UniqueEntityId("2"),
			answerId,
		});

		inMemoryAnswersAttachmentsRepository.items.push(
			firstAttachment,
			secondAttachment,
		);

		await sut.execute({
			authorId: authorId.toString(),
			answerId: answerId.toString(),
		});

		const hasItemInMemory = await inMemoryAnswersRepository.findById(
			answerId.toString(),
		);
		const hasAttachmentInMemory =
			inMemoryAnswersAttachmentsRepository.items.length > 0;

		expect(hasItemInMemory).toBeNull();
		expect(hasAttachmentInMemory).toBeFalsy();
	});

	it("should not be able to delete an answer from another author", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			authorId: "wrong-author-id",
			answerId: answerId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
