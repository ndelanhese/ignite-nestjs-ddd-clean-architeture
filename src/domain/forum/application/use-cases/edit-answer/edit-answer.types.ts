import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { Answer } from "@forum-entities/answer";

export type EditAnswerUseCaseProps = {
	authorId: string;
	answerId: string;
	content: string;
	attachmentsIds: string[];
};

export type EditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer;
	}
>;
