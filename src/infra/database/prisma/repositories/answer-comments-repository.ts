import { PaginationParams } from "@core/repositories/pagination-params";
import { AnswerComment } from "@forum-entities/answer-comment";
import { AnswerCommentsRepository } from "@forum-repositories/answer-comments-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAnswerCommentsRepository
	implements AnswerCommentsRepository
{
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<AnswerComment | null> {
		throw new Error("Method not implemented.");
	}
	async findManyByAnswerId(
		answerId: string,
		params: PaginationParams,
	): Promise<AnswerComment[]> {
		throw new Error("Method not implemented.");
	}
	async create(answerComment: AnswerComment): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async delete(answerComment: AnswerComment): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
