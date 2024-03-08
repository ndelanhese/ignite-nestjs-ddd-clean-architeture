import { DomainEvent } from "@core/events/domain-event";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";

export class QuestionBestQuestionChosenEvent implements DomainEvent {
	public occurredAt: Date;
	public question: Question;
	public bestAnswerId: UniqueEntityId;

	constructor(question: Question, bestAnswerId: UniqueEntityId) {
		this.question = question;
		this.bestAnswerId = bestAnswerId;
		this.occurredAt = new Date();
	}

	getAggregateId(): UniqueEntityId {
		return this.question.id;
	}
}
