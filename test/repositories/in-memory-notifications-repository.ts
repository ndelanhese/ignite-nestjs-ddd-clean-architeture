import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Notification } from "@notification-entities/notification";
import { NotificationsRepository } from "@notification-repositories/notifications-repository";

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	public items: Notification[] = [];

	async findById(id: string): Promise<Notification | null> {
		const uniqueEntityId = new UniqueEntityId(id);
		return (
			this.items.find(
				(item) => item.id.toValue() === uniqueEntityId.toValue(),
			) ?? null
		);
	}

	async create(notification: Notification) {
		this.items.push(notification);
	}

	async save(notification: Notification): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id === notification.id,
		);

		this.items[itemIndex] = notification;
	}
}
