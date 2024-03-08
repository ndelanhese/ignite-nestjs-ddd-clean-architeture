import { left, right } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	DeleteAnswerUseCaseProps,
	DeleteAnswerUseCaseResponse,
} from "./delete-answer.types";

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseProps): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.answersRepository.delete(answer);

		return right({});
	}
}
