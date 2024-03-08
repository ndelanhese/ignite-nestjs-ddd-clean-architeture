import { left, right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { ResourceNotFoundError } from "@errors/resource-not-found-error";
import { AnswerAttachment } from "@forum-entities/answer-attachment";
import { AnswerAttachmentList } from "@forum-entities/answer-attachment-list";
import { AnswerAttachmentsRepository } from "@forum-repositories/answer-attachments-repository";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	EditAnswerUseCaseProps,
	EditAnswerUseCaseResponse,
} from "./edit-answer.types";

export class EditAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answerAttachmentsRepository: AnswerAttachmentsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
		attachmentsIds,
	}: EditAnswerUseCaseProps): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		const currentAnswerAttachments =
			await this.answerAttachmentsRepository.findManyByAnswerId(answerId);
		const answerAttachmentList = new AnswerAttachmentList(
			currentAnswerAttachments,
		);

		const answerAttachments = attachmentsIds.map((attachmentId) =>
			AnswerAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				answerId: answer.id,
			}),
		);

		answerAttachmentList.update(answerAttachments);

		answer.content = content;
		answer.attachments = answerAttachmentList;

		await this.answersRepository.save(answer);

		return right({
			answer,
		});
	}
}
