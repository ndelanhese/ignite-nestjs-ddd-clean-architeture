import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Comment } from "@forum-entities/comment";
import { QuestionCommentProps } from "./question-comment.types";

export class QuestionComment extends Comment<QuestionCommentProps> {
	static create(
		props: Optional<QuestionCommentProps, "createdAt">,
		id?: UniqueEntityId,
	) {
		const questionComment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return questionComment;
	}

	get questionId() {
		return this.props.questionId;
	}
}
