import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { Question } from "@forum-entities/question";

export type ChooseQuestionBestAnswerUseCaseProps = {
	answerId: string;
	authorId: string;
};

export type ChooseQuestionBestAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question;
	}
>;
