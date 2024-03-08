import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export type CommentProps = {
	authorId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
};
