import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { Notification } from "@notification-entities/notification";
import { NotificationProps } from "@notification-entities/notification/notification.types";

export const makeNotification = (
	override: Partial<NotificationProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeNotificationId = id ?? new UniqueEntityId(faker.vehicle.model());
	const newNotification = Notification.create(
		{
			recipientId: new UniqueEntityId(),
			title: faker.lorem.sentence(4),
			content: faker.lorem.sentence(10),
			...override,
		},
		fakeNotificationId,
	);

	return { fakeNotificationId, newNotification };
};
