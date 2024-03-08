import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@core/errors/use-case-error/resource-not-found-error";

export type DeleteAnswerCommentUseCaseProps = {
	authorId: string;
	answerCommentId: string;
};

export type DeleteAnswerCommentUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
