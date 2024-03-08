import { right } from "@core/either";
import { AnswerCommentsRepository } from "@forum-repositories/answer-comments-repository";
import {
	FetchAnswerCommentsUseCaseProps,
	FetchAnswerCommentsUseCaseResponse,
} from "./fetch-answer-comments.types";

export class FetchAnswerCommentsUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
	}: FetchAnswerCommentsUseCaseProps): Promise<FetchAnswerCommentsUseCaseResponse> {
		const answerComments =
			await this.answerCommentsRepository.findManyByAnswerId(answerId, {
				page,
			});

		return right({ answerComments });
	}
}
