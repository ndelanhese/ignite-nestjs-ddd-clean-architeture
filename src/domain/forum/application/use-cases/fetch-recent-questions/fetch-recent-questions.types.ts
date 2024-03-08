import { Either } from "@core/either";
import { Question } from "@forum-entities/question";

export type FetchRecentQuestionsUseCaseProps = {
	page: number;
};

export type FetchRecentQuestionsUseCaseResponse = Either<
	null,
	{
		questions: Question[];
	}
>;
