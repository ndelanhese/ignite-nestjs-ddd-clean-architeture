import { left, right } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { NotificationsRepository } from "@notification-repositories/notifications-repository";
import {
	ReadNotificationUseCaseProps,
	ReadNotificationUseCaseResponse,
} from "./read-notification.types";

export class ReadNotificationUseCase {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute({
		recipientId,
		notificationId,
	}: ReadNotificationUseCaseProps): Promise<ReadNotificationUseCaseResponse> {
		const notification =
			await this.notificationsRepository.findById(notificationId);

		if (!notification) {
			return left(new ResourceNotFoundError());
		}

		if (recipientId !== notification.recipientId.toString()) {
			return left(new NotAllowedError());
		}

		notification.read();

		await this.notificationsRepository.save(notification);

		return right({ notification });
	}
}
