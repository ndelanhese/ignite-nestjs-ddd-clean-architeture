import { Either } from "@core/either";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { Question } from "@forum-entities/question";

export type GetQuestionBySlugUseCaseProps = {
	slug: string;
};

export type GetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;
