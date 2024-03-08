import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { Question } from "@forum-entities/question";

export type EditQuestionUseCaseProps = {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
};

export type EditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{ question: Question }
>;
