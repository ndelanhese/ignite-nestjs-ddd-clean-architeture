import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { Answer } from "@forum-entities/answer";
import { AnswerProps } from "@forum-entities/answer/answer.types";

export const makeAnswer = (
	override: Partial<AnswerProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeAnswerId = id;
	const newAnswer = Answer.create(
		{
			questionId: new UniqueEntityId(),
			authorId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		fakeAnswerId,
	);

	return { fakeAnswerId, newAnswer };
};
