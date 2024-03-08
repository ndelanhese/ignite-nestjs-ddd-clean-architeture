import { DomainEvents } from "@core/events/domain-events";
import { EventHandler } from "@core/events/event-handler";
import { QuestionBestQuestionChosenEvent } from "@forum-events/question-best-answer-chosen-event";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import { SendNotificationUseCase } from "@notification-use-cases/send-notification";

export class OnQuestionBestAnswerChosen implements EventHandler {
	constructor(
		private answersRepository: AnswersRepository,
		private sendNotification: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswerNotification.bind(this),
			QuestionBestQuestionChosenEvent.name,
		);
	}

	private async sendQuestionBestAnswerNotification({
		question,
		bestAnswerId,
	}: QuestionBestQuestionChosenEvent) {
		const answer = await this.answersRepository.findById(
			bestAnswerId.toString(),
		);

		if (answer) {
			await this.sendNotification.execute({
				recipientId: answer.authorId.toString(),
				title: "Sua resposta foi escolhida!",
				content: `A resposta que você enviou em "${question.title
					.substring(0, 20)
					.concat("...")}" foi escolhida pelo autor!`,
			});
		}
	}
}
