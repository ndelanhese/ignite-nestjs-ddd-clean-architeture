import { Entity } from "@core/entities/entity";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionAttachmentProps } from "./question-attachment.types";

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
	get questionId() {
		return this.props.questionId;
	}

	get attachmentId() {
		return this.props.attachmentId;
	}

	static create(props: QuestionAttachmentProps, id?: UniqueEntityId) {
		return new QuestionAttachment(props, id);
	}
}
