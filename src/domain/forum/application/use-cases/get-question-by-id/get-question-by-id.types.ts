import { Either } from "@core/either";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { Question } from "@forum-entities/question";

export type GetQuestionByIdUseCaseProps = {
	id: string;
};

export type GetQuestionByIdUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;
