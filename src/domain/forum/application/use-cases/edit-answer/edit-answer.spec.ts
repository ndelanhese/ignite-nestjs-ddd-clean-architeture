import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { faker } from "@faker-js/faker";
import { makeAnswer } from "@test-factories/make-answer";
import { makeAnswerAttachment } from "@test-factories/make-answer-attachments";
import { InMemoryAnswerAttachmentsRepository } from "@test-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: EditAnswerUseCase;

describe("Edit an answer", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		sut = new EditAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswersAttachmentsRepository,
		);
	});

	it("should be able to edit an answer", async () => {
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

		const fakeAnswerContent = faker.lorem.text();
		await sut.execute({
			authorId: authorId.toString(),
			answerId: answerId.toString(),
			content: fakeAnswerContent,
			attachmentsIds: ["1", "3"],
		});

		const foundedAnswer = await inMemoryAnswersRepository.findById(
			answerId.toString(),
		);

		expect(foundedAnswer).toMatchObject({
			content: fakeAnswerContent,
		});
		expect(foundedAnswer?.attachments.compareItems).toHaveLength(2);
		expect(foundedAnswer?.attachments.currentItems).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
			expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
		]);
	});

	it("should not be able to edit an answer from another author", async () => {
		const authorId = new UniqueEntityId("answer-author");
		const answerId = new UniqueEntityId("answer-id");
		const { newAnswer } = makeAnswer({ authorId }, answerId);

		await inMemoryAnswersRepository.create(newAnswer);

		const fakeAnswerContent = faker.lorem.text();

		const result = await sut.execute({
			authorId: "wrong-author-id",
			answerId: answerId.toString(),
			content: fakeAnswerContent,
			attachmentsIds: ["9"],
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
