import { Either } from "@core/either";
import { AnswerComment } from "@forum-entities/answer-comment";

export type FetchAnswerCommentsUseCaseProps = {
	answerId: string;
	page: number;
};

export type FetchAnswerCommentsUseCaseResponse = Either<
	null,
	{
		answerComments: AnswerComment[];
	}
>;
