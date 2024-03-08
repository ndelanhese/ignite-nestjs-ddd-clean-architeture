import { Either } from "@core/either";
import { Answer } from "@forum-entities/answer";

export type FetchQuestionAnswersUseCaseProps = {
	questionId: string;
	page: number;
};

export type FetchQuestionAnswersUseCaseResponse = Either<
	null,
	{
		answers: Answer[];
	}
>;
