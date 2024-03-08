import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "@test-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswerRepository = new InMemoryAnswersRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
	});

	it("should be able to create an answer", async () => {
		const result = await sut.execute({
			questionId: "1",
			instructorId: "1",
			content: "New answer",
			attachmentsIds: ["1", "2"],
		});

		const answer = result.value?.answer;
		const itemHasBeenCreated = inMemoryAnswerRepository.items.find(
			(item) => item.id === answer?.id,
		);

		expect(result.isLeft()).toBeFalsy();
		expect(answer?.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
		expect(answer?.content).toEqual("New answer");
		expect(answer?.attachments.compareItems).toHaveLength(2);
		expect(answer?.attachments.currentItems).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
			expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
		]);
	});
});
