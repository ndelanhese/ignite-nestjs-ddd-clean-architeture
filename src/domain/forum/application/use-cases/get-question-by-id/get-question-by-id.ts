import { left, right } from "@core/either";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	GetQuestionByIdUseCaseProps,
	GetQuestionByIdUseCaseResponse,
} from "./get-question-by-id.types";

export class GetQuestionByIdUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		id,
	}: GetQuestionByIdUseCaseProps): Promise<GetQuestionByIdUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({ question });
	}
}
