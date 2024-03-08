import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { Question } from "@forum-entities/question";
import { QuestionProps } from "@forum-entities/question/question.types";

export const makeQuestion = (
	override: Partial<QuestionProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeQuestionId = id ?? new UniqueEntityId(faker.vehicle.model());
	const newQuestion = Question.create(
		{
			title: faker.lorem.sentence(),
			authorId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		fakeQuestionId,
	);

	return { fakeQuestionId, newQuestion };
};
