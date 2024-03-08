import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";

export type DeleteQuestionCommentUseCaseProps = {
	authorId: string;
	questionCommentId: string;
};

export type DeleteQuestionCommentUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
