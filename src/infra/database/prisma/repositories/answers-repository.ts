import { PaginationParams } from "@core/repositories/pagination-params";
import { Answer } from "@forum-entities/answer";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Answer | null> {
		throw new Error("Method not implemented.");
	}
	async findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<Answer[]> {
		throw new Error("Method not implemented.");
	}
	async save(question: Answer): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async create(answer: Answer): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async delete(question: Answer): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
