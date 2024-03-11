import { PaginationParams } from "@core/repositories/pagination-params";
import { Question } from "@forum-entities/question";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { Injectable } from "@nestjs/common";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = await this.prisma.question.findUnique({
			where: {
				slug,
			},
		});

		if (!question) return null;

		return PrismaQuestionMapper.toDomain(question);
	}

	async findById(id: string): Promise<Question | null> {
		const question = await this.prisma.question.findUnique({
			where: {
				id,
			},
		});

		if (!question) return null;

		return PrismaQuestionMapper.toDomain(question);
	}

	async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
		const questions = await this.prisma.question.findMany({
			orderBy: {
				createdAt: "desc",
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return questions.map(PrismaQuestionMapper.toDomain);
	}

	async create(question: Question): Promise<void> {
		await this.prisma.question.create({
			data: PrismaQuestionMapper.toPersistence(question),
		});
	}

	async save(question: Question): Promise<void> {
		await this.prisma.question.update({
			data: PrismaQuestionMapper.toPersistence(question),
			where: {
				id: question.id.toString(),
			},
		});
	}

	async delete(question: Question): Promise<void> {
		await this.prisma.question.delete({
			where: {
				id: question.id.toString(),
			},
		});
	}
}
