import { right } from "@core/either";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Answer } from "@forum-entities/answer";
import { AnswerAttachment } from "@forum-entities/answer-attachment";
import { AnswerAttachmentList } from "@forum-entities/answer-attachment-list";
import { AnswersRepository } from "@forum-repositories/answers-repository";
import {
	AnswerQuestionUseCaseProps,
	AnswerQuestionUseCaseResponse,
} from "./answer-question.types";

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
		attachmentsIds,
	}: AnswerQuestionUseCaseProps): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		const attachmentsAttachments = attachmentsIds.map((attachmentId) =>
			AnswerAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				answerId: answer.id,
			}),
		);

		answer.attachments = new AnswerAttachmentList(attachmentsAttachments);

		await this.answersRepository.create(answer);

		return right({ answer });
	}
}
