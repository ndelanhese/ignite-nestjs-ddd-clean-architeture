import { right } from "@core/either";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	FetchQuestionAnswersUseCaseProps,
	FetchQuestionAnswersUseCaseResponse,
} from "./fetch-question-answers.types";

export class FetchQuestionAnswersUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionAnswersUseCaseProps): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			questionId,
			{ page },
		);

		return right({ answers });
	}
}
