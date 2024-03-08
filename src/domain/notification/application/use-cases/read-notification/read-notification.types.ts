import { Either } from "@core/either";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { Notification } from "@notification-entities/notification";

export type ReadNotificationUseCaseProps = {
	recipientId: string;
	notificationId: string;
};

export type ReadNotificationUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		notification: Notification;
	}
>;
