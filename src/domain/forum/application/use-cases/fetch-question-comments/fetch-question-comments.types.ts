import { Either } from "@core/either";
import { QuestionComment } from "@forum-entities/question-comment";

export type FetchQuestionCommentsUseCaseProps = {
	questionId: string;
	page: number;
};

export type FetchQuestionCommentsUseCaseResponse = Either<
	null,
	{
		questionComments: QuestionComment[];
	}
>;
