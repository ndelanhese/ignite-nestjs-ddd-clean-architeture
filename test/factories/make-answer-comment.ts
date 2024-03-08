import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { AnswerComment } from "@forum-entities/answer-comment";
import { AnswerCommentProps } from "@forum-entities/answer-comment/answer-comment.types";

export const makeAnswerComment = (
	override: Partial<AnswerCommentProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeAnswerCommentId = id ?? new UniqueEntityId(faker.vehicle.model());
	const newAnswerComment = AnswerComment.create(
		{
			authorId: new UniqueEntityId(),
			answerId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		fakeAnswerCommentId,
	);

	return { fakeAnswerCommentId, newAnswerComment };
};
