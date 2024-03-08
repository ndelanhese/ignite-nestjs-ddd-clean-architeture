import { DomainEvent } from "@core/events/domain-event";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Answer } from "@forum-entities/answer";

export class AnswerCreatedEvent implements DomainEvent {
	public occurredAt: Date;
	public answer: Answer;

	constructor(answer: Answer) {
		this.answer = answer;
		this.occurredAt = new Date();
	}

	getAggregateId(): UniqueEntityId {
		return this.answer.id;
	}
}
