import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type DomainEvent = {
	occurredAt: Date;
	getAggregateId(): UniqueEntityId;
};
