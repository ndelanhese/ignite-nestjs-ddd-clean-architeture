import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type QuestionAttachmentProps = {
	questionId: UniqueEntityId;
	attachmentId: UniqueEntityId;
};
