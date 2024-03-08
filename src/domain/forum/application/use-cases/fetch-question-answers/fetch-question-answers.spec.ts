import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { makeAnswer } from "@test-factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "@test-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch question answers", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
	});

	it("should be able to fetch question answers", async () => {
		const fakeQuestionId = new UniqueEntityId(faker.music.songName());
		const { newAnswer: firstAnswer } = makeAnswer({
			questionId: fakeQuestionId,
		});
		const { newAnswer: secondAnswer } = makeAnswer({
			questionId: fakeQuestionId,
		});
		const { newAnswer: thirtyAnswer } = makeAnswer({
			questionId: fakeQuestionId,
		});

		await inMemoryAnswersRepository.create(firstAnswer);
		await inMemoryAnswersRepository.create(secondAnswer);
		await inMemoryAnswersRepository.create(thirtyAnswer);

		const result = await sut.execute({
			questionId: fakeQuestionId.toString(),
			page: 1,
		});
		const answers = result.value?.answers;

		expect(result.isRight()).toBeTruthy();
		expect(answers).toHaveLength(3);
		expect(answers).toEqual([
			expect.objectContaining({
				questionId: fakeQuestionId,
			}),
			expect.objectContaining({
				questionId: fakeQuestionId,
			}),
			expect.objectContaining({
				questionId: fakeQuestionId,
			}),
		]);
	});

	it("should be able to fetch paginated question answers", async () => {
		const fakeQuestionId = new UniqueEntityId(faker.music.songName());
		for (let i = 1; i <= 22; i++) {
			const { newAnswer } = makeAnswer({
				questionId: fakeQuestionId,
			});
			await inMemoryAnswersRepository.create(newAnswer);
		}

		const result = await sut.execute({
			questionId: fakeQuestionId.toString(),
			page: 2,
		});
		const answers = result.value?.answers;

		expect(result.isRight()).toBeTruthy();
		expect(answers).toHaveLength(2);
	});
});
