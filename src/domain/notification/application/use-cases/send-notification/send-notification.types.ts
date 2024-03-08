import { Either } from "@core/either";
import { Notification } from "@notification-entities/notification";

export type SendNotificationUseCaseProps = {
	recipientId: string;
	title: string;
	content: string;
};

export type SendNotificationUseCaseResponse = Either<
	null,
	{
		notification: Notification;
	}
>;
