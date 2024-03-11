import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";
import { Slug } from "@forum-value-objects/slug";
import { Prisma, Question as PrismaQuestion } from "@prisma/client";

export class PrismaQuestionMapper {
	static toDomain(raw: PrismaQuestion): Question {
		return Question.create(
			{
				title: raw.title,
				content: raw.content,
				authorId: new UniqueEntityId(raw.authorId),
				bestAnswerId: raw.bestAnswerId
					? new UniqueEntityId(raw.bestAnswerId)
					: null,
				slug: Slug.create(raw.slug),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityId(raw.id),
		);
	}

	static toPersistence(raw: Question): Prisma.QuestionUncheckedCreateInput {
		return {
			id: raw.id.toString(),
			authorId: raw.authorId.toString(),
			bestAnswerId: raw.bestAnswerId?.toString(),
			title: raw.title,
			content: raw.content,
			slug: raw.slug.value,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		};
	}
}
