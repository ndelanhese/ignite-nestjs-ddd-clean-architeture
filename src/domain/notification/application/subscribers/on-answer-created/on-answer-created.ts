import { DomainEvents } from "@core/events/domain-events";
import { EventHandler } from "@core/events/event-handler";
import { AnswerCreatedEvent } from "@forum-events/answer-created-event";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { SendNotificationUseCase } from "@notification-use-cases/send-notification";

export class OnAnswerCreated implements EventHandler {
	constructor(
		private questionRepository: QuestionsRepository,
		private sendNotification: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name,
		);
	}

	private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
		const question = await this.questionRepository.findById(
			answer.questionId.toString(),
		);

		if (question) {
			await this.sendNotification.execute({
				recipientId: question.authorId.toString(),
				title: `Nova resposta em "${question.title
					.substring(0, 40)
					.concat("...")}"`,
				content: answer.except,
			});
		}
	}
}
