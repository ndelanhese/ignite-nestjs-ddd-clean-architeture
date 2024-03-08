import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Comment } from "@forum-entities/comment";
import { AnswerCommentProps } from "./answer-comment.types";

export class AnswerComment extends Comment<AnswerCommentProps> {
	static create(
		props: Optional<AnswerCommentProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const answerComment = new AnswerComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answerComment;
	}

	get answerId() {
		return this.props.answerId;
	}
}
