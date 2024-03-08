import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { CommentProps } from "@forum-entities/comment/comment.types";

export type QuestionCommentProps = CommentProps & {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
};
