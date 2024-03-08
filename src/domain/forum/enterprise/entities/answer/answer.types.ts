import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AnswerAttachmentList } from "@forum-entities/answer-attachment-list";

export type AnswerProps = {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	attachments: AnswerAttachmentList;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
};
