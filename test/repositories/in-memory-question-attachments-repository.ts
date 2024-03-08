import { QuestionAttachment } from "@forum-entities/question-attachment";
import { QuestionAttachmentsRepository } from "@forum-repositories/question-attachments-repository";

export class InMemoryQuestionAttachmentsRepository
	implements QuestionAttachmentsRepository
{
	public items: QuestionAttachment[] = [];

	async findManyByQuestionId(
		questionId: string,
	): Promise<QuestionAttachment[]> {
		const questionAttachments = this.items.filter(
			(item) => item.questionId.toString() === questionId,
		);

		return questionAttachments;
	}

	async deleteManyByQuestionId(questionId: string): Promise<void> {
		const questionAttachments = this.items.filter(
			(item) => item.questionId.toString() !== questionId,
		);

		this.items = questionAttachments;
	}
}
