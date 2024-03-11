import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/answer-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/answers-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/question-attachments-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/question-comments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/questions-repository";

@Module({
	providers: [
		PrismaService,
		{ provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
		PrismaQuestionCommentsRepository,
		PrismaQuestionAttachmentsRepository,
		PrismaAnswersRepository,
		PrismaAnswerCommentsRepository,
		PrismaAnswerAttachmentsRepository,
	],
	exports: [
		PrismaService,
		QuestionsRepository,
		PrismaQuestionCommentsRepository,
		PrismaQuestionAttachmentsRepository,
		PrismaAnswersRepository,
		PrismaAnswerCommentsRepository,
		PrismaAnswerAttachmentsRepository,
	],
})
export class DatabaseModule {}
