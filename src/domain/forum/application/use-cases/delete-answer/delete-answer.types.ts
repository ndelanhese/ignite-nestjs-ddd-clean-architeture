import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";

export type DeleteAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
};

export type DeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	object
>;
