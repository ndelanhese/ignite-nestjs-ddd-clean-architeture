import { right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Question } from "@forum-entities/question";
import { QuestionAttachment } from "@forum-entities/question-attachment";
import { QuestionAttachmentList } from "@forum-entities/question-attachment-list";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	CreateQuestionUseCaseProps,
	CreateQuestionUseCaseResponse,
} from "./create-question.types";

export class CreateQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		content,
		title,
		attachmentsIds,
	}: CreateQuestionUseCaseProps): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		});

		const questionAttachments = attachmentsIds.map((attachmentId) =>
			QuestionAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				questionId: question.id,
			}),
		);

		question.attachments = new QuestionAttachmentList(questionAttachments);

		await this.questionsRepository.create(question);

		return right({ question });
	}
}
