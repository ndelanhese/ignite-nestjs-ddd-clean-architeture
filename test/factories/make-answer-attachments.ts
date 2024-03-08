import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { AnswerAttachment } from "@forum-entities/answer-attachment";
import { AnswerAttachmentProps } from "@forum-entities/answer-attachment/answer-attachment.types";

export const makeAnswerAttachment = (
	override: Partial<AnswerAttachmentProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeAnswerAttachmentId =
		id ?? new UniqueEntityId(faker.vehicle.model());
	const newAnswerAttachment = AnswerAttachment.create(
		{
			answerId: new UniqueEntityId(),
			attachmentId: new UniqueEntityId(),
			...override,
		},
		fakeAnswerAttachmentId,
	);

	return { fakeAnswerAttachmentId, newAnswerAttachment };
};
