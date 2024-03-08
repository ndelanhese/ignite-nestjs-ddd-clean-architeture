import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { faker } from "@faker-js/faker";
import { makeQuestionComment } from "@test-factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "@test-repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question comment", () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
	});

	it("should be able to delete comment question", async () => {
		const { newQuestionComment } = makeQuestionComment();

		await inMemoryQuestionCommentsRepository.create(newQuestionComment);

		await sut.execute({
			authorId: newQuestionComment.authorId.toString(),
			questionCommentId: newQuestionComment.id.toString(),
		});

		const hasItemInMemory = await inMemoryQuestionCommentsRepository.findById(
			newQuestionComment.id.toString(),
		);

		expect(hasItemInMemory).toBeNull();
	});

	it("should not be able to delete a comment question from another author", async () => {
		const authorId = new UniqueEntityId(faker.animal.dog());
		const { newQuestionComment } = makeQuestionComment({ authorId });

		await inMemoryQuestionCommentsRepository.create(newQuestionComment);

		const result = await sut.execute({
			authorId: "wrong-author-id",
			questionCommentId: newQuestionComment.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
