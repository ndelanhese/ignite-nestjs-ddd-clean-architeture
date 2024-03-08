import { right } from "@core/either";
import { QuestionCommentsRepository } from "@forum-repositories/question-comments-repository";
import {
	FetchQuestionCommentsUseCaseProps,
	FetchQuestionCommentsUseCaseResponse,
} from "./fetch-question-comments.types";

export class FetchQuestionCommentsUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionCommentsUseCaseProps): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments =
			await this.questionCommentsRepository.findManyByQuestionId(questionId, {
				page,
			});

		return right({ questionComments });
	}
}
