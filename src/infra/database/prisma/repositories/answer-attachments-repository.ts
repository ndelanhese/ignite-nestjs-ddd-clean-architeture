import { AnswerAttachment } from "@forum-entities/answer-attachment";
import { AnswerAttachmentsRepository } from "@forum-repositories/answer-attachments-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAnswerAttachmentsRepository
	implements AnswerAttachmentsRepository
{
	constructor(private readonly prisma: PrismaService) {}

	async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
		throw new Error("Method not implemented.");
	}
	async deleteManyByAnswerId(answerId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
