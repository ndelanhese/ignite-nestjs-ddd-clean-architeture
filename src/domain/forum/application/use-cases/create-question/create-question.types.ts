import { Either } from "@core/either";
import { Question } from "@forum-entities/question";

export type CreateQuestionUseCaseProps = {
	authorId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
};

export type CreateQuestionUseCaseResponse = Either<
	null,
	{
		question: Question;
	}
>;
