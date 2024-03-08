import { DomainEvents } from "@core/events/domain-events";
import { PaginationParams } from "@core/repositories/pagination-params";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Answer } from "@forum-entities/answer";
import { AnswerAttachmentsRepository } from "@forum-repositories/answer-attachments-repository";
import { AnswersRepository } from "@forum-repositories/answers-repository";

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	constructor(
		private answerAttachmentsRepository: AnswerAttachmentsRepository,
	) {}

	async findById(id: string): Promise<Answer | null> {
		const uniqueEntityId = new UniqueEntityId(id);
		return (
			this.items.find(
				(item) => item.id.toValue() === uniqueEntityId.toValue(),
			) ?? null
		);
	}

	async findManyByQuestionId(
		questionId: string,
		{ page }: PaginationParams,
	): Promise<Answer[]> {
		const answers = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);

		return answers;
	}

	async save(answer: Answer): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items[itemIndex] = answer;

		DomainEvents.dispatchEventsForAggregate(answer.id);
	}

	async create(answer: Answer) {
		this.items.push(answer);

		DomainEvents.dispatchEventsForAggregate(answer.id);
	}

	async delete(answer: Answer): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items.splice(itemIndex, 1);

		await this.answerAttachmentsRepository.deleteManyByAnswerId(
			answer.id.toString(),
		);
	}
}
