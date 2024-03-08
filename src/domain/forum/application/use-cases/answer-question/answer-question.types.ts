import { Either } from "@core/either";
import { Answer } from "@forum-entities/answer";

export type AnswerQuestionUseCaseProps = {
	instructorId: string;
	questionId: string;
	attachmentsIds: string[];
	content: string;
};

export type AnswerQuestionUseCaseResponse = Either<
	null,
	{
		answer: Answer;
	}
>;
