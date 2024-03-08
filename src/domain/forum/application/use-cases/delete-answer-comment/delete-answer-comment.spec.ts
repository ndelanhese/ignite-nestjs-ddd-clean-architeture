import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { faker } from "@faker-js/faker";
import { makeAnswerComment } from "@test-factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "@test-repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer comment", () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
	});

	it("should be able to delete comment answer", async () => {
		const { newAnswerComment } = makeAnswerComment();

		await inMemoryAnswerCommentsRepository.create(newAnswerComment);

		await sut.execute({
			authorId: newAnswerComment.authorId.toString(),
			answerCommentId: newAnswerComment.id.toString(),
		});

		const hasItemInMemory = await inMemoryAnswerCommentsRepository.findById(
			newAnswerComment.id.toString(),
		);

		expect(hasItemInMemory).toBeNull();
	});

	it("should not be able to delete a comment answer from another author", async () => {
		const authorId = new UniqueEntityId(faker.animal.dog());
		const { newAnswerComment } = makeAnswerComment({ authorId });

		await inMemoryAnswerCommentsRepository.create(newAnswerComment);

		const result = await sut.execute({
			authorId: "wrong-author-id",
			answerCommentId: newAnswerComment.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
