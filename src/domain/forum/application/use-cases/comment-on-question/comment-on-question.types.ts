import { Either } from "@core/either";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { QuestionComment } from "@forum-entities/question-comment";

export type CommentOnQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
	content: string;
};

export type CommentOnQuestionUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		questionComment: QuestionComment;
	}
>;
