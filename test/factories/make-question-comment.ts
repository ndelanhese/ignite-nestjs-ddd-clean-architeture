import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { QuestionComment } from "@forum-entities/question-comment";
import { QuestionCommentProps } from "@forum-entities/question-comment/question-comment.types";

export const makeQuestionComment = (
	override: Partial<QuestionCommentProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeQuestionCommentId = id ?? new UniqueEntityId(faker.vehicle.model());
	const newQuestionComment = QuestionComment.create(
		{
			authorId: new UniqueEntityId(),
			questionId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		fakeQuestionCommentId,
	);

	return { fakeQuestionCommentId, newQuestionComment };
};
