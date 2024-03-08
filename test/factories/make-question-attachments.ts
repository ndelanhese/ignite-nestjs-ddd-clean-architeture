import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { QuestionAttachment } from "@forum-entities/question-attachment";
import { QuestionAttachmentProps } from "@forum-entities/question-attachment/question-attachment.types";

export const makeQuestionAttachment = (
	override: Partial<QuestionAttachmentProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeQuestionAttachmentId =
		id ?? new UniqueEntityId(faker.vehicle.model());
	const newQuestionAttachment = QuestionAttachment.create(
		{
			questionId: new UniqueEntityId(),
			attachmentId: new UniqueEntityId(),
			...override,
		},
		fakeQuestionAttachmentId,
	);

	return { fakeQuestionAttachmentId, newQuestionAttachment };
};
