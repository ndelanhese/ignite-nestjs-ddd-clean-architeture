import { left, right } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	ChooseQuestionBestAnswerUseCaseProps,
	ChooseQuestionBestAnswerUseCaseResponse,
} from "./choose-question-best-answer.types";

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private questionsRepository: QuestionsRepository,
	) {}

	async execute({
		answerId,
		authorId,
	}: ChooseQuestionBestAnswerUseCaseProps): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.save(question);

		return right({ question });
	}
}
