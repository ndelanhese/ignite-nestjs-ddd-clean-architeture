import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionAttachmentList } from "@forum-entities/question-attachment-list";
import { Slug } from "@forum-value-objects/slug";

export type QuestionProps = {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId | null;
	title: string;
	content: string;
	slug: Slug;
	attachments: QuestionAttachmentList;
	createdAt: Date;
	updatedAt?: Date | null;
};
