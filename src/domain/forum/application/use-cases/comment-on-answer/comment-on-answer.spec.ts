import { makeAnswer } from "@test-factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "@test-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswerCommentsRepository } from "@test-repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Create Answer comment", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository,
		);
	});

	it("should be able to comment on answer", async () => {
		const { newAnswer } = makeAnswer();

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			authorId: "1",
			content: "bla bla bla",
			answerId: newAnswer.id.toString(),
		});

		if (result.isRight()) {
			const answerComment = result.value.answerComment;

			const itemHasBeenCreated = inMemoryAnswerCommentsRepository.items.find(
				(item) => item.id.toString() === answerComment.id.toString(),
			);

			expect(answerComment.id).toBeTruthy();
			expect(itemHasBeenCreated).toBeTruthy();
		}
	});
});
