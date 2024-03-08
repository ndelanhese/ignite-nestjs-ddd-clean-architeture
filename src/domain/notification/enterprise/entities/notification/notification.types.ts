import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type NotificationProps = {
	recipientId: UniqueEntityId;
	title: string;
	content: string;
	readAt?: Date;
	createdAt: Date;
};
