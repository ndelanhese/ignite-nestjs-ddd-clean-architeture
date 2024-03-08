import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { makeQuestionComment } from "@test-factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "@test-repositories/in-memory-question-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch question comments", () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
	});

	it("should be able to fetch question comments", async () => {
		const fakeQuestionId = new UniqueEntityId(faker.music.songName());
		const { newQuestionComment: firstAnswer } = makeQuestionComment({
			questionId: fakeQuestionId,
		});
		const { newQuestionComment: secondAnswer } = makeQuestionComment({
			questionId: fakeQuestionId,
		});
		const { newQuestionComment: thirtyAnswer } = makeQuestionComment({
			questionId: fakeQuestionId,
		});

		await inMemoryQuestionCommentsRepository.create(firstAnswer);
		await inMemoryQuestionCommentsRepository.create(secondAnswer);
		await inMemoryQuestionCommentsRepository.create(thirtyAnswer);

		const result = await sut.execute({
			questionId: fakeQuestionId.toString(),
			page: 1,
		});
		const questionComments = result.value?.questionComments;

		expect(result.isRight()).toBeTruthy();
		expect(questionComments).toHaveLength(3);
		expect(questionComments).toEqual([
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

	it("should be able to fetch paginated question comments", async () => {
		const fakeQuestionId = new UniqueEntityId(faker.music.songName());
		for (let i = 1; i <= 22; i++) {
			const { newQuestionComment } = makeQuestionComment({
				questionId: fakeQuestionId,
			});
			await inMemoryQuestionCommentsRepository.create(newQuestionComment);
		}

		const result = await sut.execute({
			questionId: fakeQuestionId.toString(),
			page: 2,
		});
		const questionComments = result.value?.questionComments;

		expect(result.isRight()).toBeTruthy();
		expect(questionComments).toHaveLength(2);
	});
});
