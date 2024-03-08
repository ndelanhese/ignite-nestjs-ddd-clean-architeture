import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";

export type DeleteQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
};

export type DeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
