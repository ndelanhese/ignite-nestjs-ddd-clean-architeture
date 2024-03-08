import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { makeAnswerComment } from "@test-factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "@test-repositories/in-memory-answer-comments-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch answer comments", () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
	});

	it("should be able to fetch answer comments", async () => {
		const fakeAnswerId = new UniqueEntityId(faker.music.songName());
		const { newAnswerComment: firstAnswer } = makeAnswerComment({
			answerId: fakeAnswerId,
		});
		const { newAnswerComment: secondAnswer } = makeAnswerComment({
			answerId: fakeAnswerId,
		});
		const { newAnswerComment: thirtyAnswer } = makeAnswerComment({
			answerId: fakeAnswerId,
		});

		await inMemoryAnswerCommentsRepository.create(firstAnswer);
		await inMemoryAnswerCommentsRepository.create(secondAnswer);
		await inMemoryAnswerCommentsRepository.create(thirtyAnswer);

		const result = await sut.execute({
			answerId: fakeAnswerId.toString(),
			page: 1,
		});

		const answerComments = result.value?.answerComments;
		expect(result.isRight()).toBeTruthy();
		expect(answerComments).toHaveLength(3);
		expect(answerComments).toEqual([
			expect.objectContaining({
				answerId: fakeAnswerId,
			}),
			expect.objectContaining({
				answerId: fakeAnswerId,
			}),
			expect.objectContaining({
				answerId: fakeAnswerId,
			}),
		]);
	});

	it("should be able to fetch paginated answer comments", async () => {
		const fakeAnswerId = new UniqueEntityId(faker.music.songName());
		for (let i = 1; i <= 22; i++) {
			const { newAnswerComment } = makeAnswerComment({
				answerId: fakeAnswerId,
			});
			await inMemoryAnswerCommentsRepository.create(newAnswerComment);
		}

		const result = await sut.execute({
			answerId: fakeAnswerId.toString(),
			page: 2,
		});
		const answerComments = result.value?.answerComments;

		expect(result.isRight()).toBeTruthy();
		expect(answerComments).toHaveLength(2);
	});
});
