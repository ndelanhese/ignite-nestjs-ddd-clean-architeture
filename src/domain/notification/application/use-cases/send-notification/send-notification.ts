import { right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Notification } from "@notification-entities/notification";
import { NotificationsRepository } from "@notification-repositories/notifications-repository";
import {
	SendNotificationUseCaseProps,
	SendNotificationUseCaseResponse,
} from "./send-notification.types";

export class SendNotificationUseCase {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute({
		recipientId,
		content,
		title,
	}: SendNotificationUseCaseProps): Promise<SendNotificationUseCaseResponse> {
		const notification = Notification.create({
			recipientId: new UniqueEntityId(recipientId),
			title,
			content,
		});

		await this.notificationsRepository.create(notification);

		return right({ notification });
	}
}
