import { left, right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { QuestionComment } from "@forum-entities/question-comment";
import { QuestionCommentsRepository } from "@forum-repositories/question-comments-repository";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	CommentOnQuestionUseCaseProps,
	CommentOnQuestionUseCaseResponse,
} from "./comment-on-question.types";

export class CommentOnQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionCommentsRepository: QuestionCommentsRepository,
	) {}

	async execute({
		authorId,
		questionId,
		content,
	}: CommentOnQuestionUseCaseProps): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			content,
			questionId: new UniqueEntityId(questionId),
		});

		await this.questionCommentsRepository.create(questionComment);

		return right({ questionComment });
	}
}
