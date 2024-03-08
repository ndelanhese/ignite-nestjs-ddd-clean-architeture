import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type AnswerAttachmentProps = {
	answerId: UniqueEntityId;
	attachmentId: UniqueEntityId;
};
