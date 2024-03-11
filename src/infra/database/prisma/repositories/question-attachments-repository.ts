import { QuestionAttachment } from "@forum-entities/question-attachment";
import { QuestionAttachmentsRepository } from "@forum-repositories/question-attachments-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaQuestionAttachmentsRepository
	implements QuestionAttachmentsRepository
{
	constructor(private readonly prisma: PrismaService) {}

	async findManyByQuestionId(
		questionId: string,
	): Promise<QuestionAttachment[]> {
		throw new Error("Method not implemented.");
	}
	async deleteManyByQuestionId(questionId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
