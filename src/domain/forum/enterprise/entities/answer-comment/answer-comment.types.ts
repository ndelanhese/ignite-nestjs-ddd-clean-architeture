import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { CommentProps } from "@forum-entities/comment/comment.types";

export type AnswerCommentProps = CommentProps & {
	answerId: UniqueEntityId;
};
