import { AnswerAttachment } from "@forum-entities/answer-attachment";
import { AnswerAttachmentsRepository } from "@forum-repositories/answer-attachments-repository";

export class InMemoryAnswerAttachmentsRepository
	implements AnswerAttachmentsRepository
{
	public items: AnswerAttachment[] = [];

	async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
		const answerAttachments = this.items.filter(
			(item) => item.answerId.toString() === answerId,
		);

		return answerAttachments;
	}

	async deleteManyByAnswerId(answerId: string): Promise<void> {
		const answerAttachments = this.items.filter(
			(item) => item.answerId.toString() !== answerId,
		);

		this.items = answerAttachments;
	}
}
