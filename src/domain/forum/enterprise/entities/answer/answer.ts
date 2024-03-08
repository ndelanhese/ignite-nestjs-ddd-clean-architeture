import { AggregateRoot } from "@core/entities/aggregate-root";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AnswerAttachmentList } from "@forum-entities/answer-attachment-list";
import { AnswerCreatedEvent } from "../../events/answer-created-event";
import { AnswerProps } from "./answer.types";

export class Answer extends AggregateRoot<AnswerProps> {
	static create(
		props: Optional<AnswerProps, "createdAt" | "attachments">,
		id?: UniqueEntityId,
	) {
		const answer = new Answer(
			{
				...props,
				attachments: props.attachments ?? new AnswerAttachmentList(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		const isNewAnswer = !id;

		if (isNewAnswer) {
			answer.addDomainEvent(new AnswerCreatedEvent(answer));
		}

		return answer;
	}

	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get content() {
		return this.props.content;
	}

	get attachments() {
		return this.props.attachments;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get except() {
		return this.content.substring(0, 120).trim().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set attachments(attachments: AnswerAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}
}