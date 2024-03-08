import { left, right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { QuestionAttachment } from "@forum-entities/question-attachment";
import { QuestionAttachmentList } from "@forum-entities/question-attachment-list";
import { QuestionAttachmentsRepository } from "@forum-repositories/question-attachments-repository";
import { QuestionsRepository } from "@forum-repositories/questions-repository";
import {
	EditQuestionUseCaseProps,
	EditQuestionUseCaseResponse,
} from "./edit-question.types";

export class EditQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionAttachmentsRepository: QuestionAttachmentsRepository,
	) {}

	async execute({
		authorId,
		questionId,
		content,
		title,
		attachmentsIds,
	}: EditQuestionUseCaseProps): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		const currentQuestionAttachments =
			await this.questionAttachmentsRepository.findManyByQuestionId(questionId);
		const questionAttachmentList = new QuestionAttachmentList(
			currentQuestionAttachments,
		);

		const questionAttachments = attachmentsIds.map((attachmentId) =>
			QuestionAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				questionId: question.id,
			}),
		);

		questionAttachmentList.update(questionAttachments);

		question.title = title;
		question.content = content;
		question.attachments = questionAttachmentList;

		await this.questionsRepository.save(question);

		return right({
			question,
		});
	}
}
