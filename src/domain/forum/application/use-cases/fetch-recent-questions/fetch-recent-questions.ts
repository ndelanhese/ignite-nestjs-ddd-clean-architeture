import { right } from "@core/either";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	FetchRecentQuestionsUseCaseProps,
	FetchRecentQuestionsUseCaseResponse,
} from "./fetch-recent-questions.types";

export class FetchRecentQuestionsUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		page,
	}: FetchRecentQuestionsUseCaseProps): Promise<FetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({ page });

		return right({ questions });
	}
}
