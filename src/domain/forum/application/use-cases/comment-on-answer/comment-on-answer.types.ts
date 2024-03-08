import { Either } from "@core/either";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { AnswerComment } from "@forum-entities/answer-comment";

export type CommentOnAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
	content: string;
};

export type CommentOnAnswerUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		answerComment: AnswerComment;
	}
>;
