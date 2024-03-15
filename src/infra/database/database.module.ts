import { QuestionsRepository } from "@forum-repositories/questions-repository";
import { StudentsRepository } from "@forum-repositories/students-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/answer-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/answers-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/question-attachments-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/question-comments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/questions-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/students-repository,";

@Module({
	providers: [
		PrismaService,
		{ provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
		{ provide: StudentsRepository, useClass: PrismaStudentsRepository },
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
		StudentsRepository,
	],
})
export class DatabaseModule {}
