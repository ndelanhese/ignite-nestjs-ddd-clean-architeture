import { left, right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { AnswerComment } from "@forum-entities/answer-comment";
import { AnswerCommentsRepository } from "@forum-repositories/answer-comments-repository";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	CommentOnAnswerUseCaseProps,
	CommentOnAnswerUseCaseResponse,
} from "./comment-on-answer.types";

export class CommentOnAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerCommentsRepository: AnswerCommentsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
	}: CommentOnAnswerUseCaseProps): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			content,
			answerId: new UniqueEntityId(answerId),
		});

		await this.answerCommentsRepository.create(answerComment);

		return right({ answerComment });
	}
}
