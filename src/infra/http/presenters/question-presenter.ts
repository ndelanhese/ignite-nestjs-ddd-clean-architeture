import { Question } from "@forum-entities/question";

export class QuestionPresenter {
	static toHTTP(question: Question) {
		return {
			id: question.id.toString(),
			title: question.title,
			content: question.content,
			slug: question.slug.value,
			best_answer_id: question.bestAnswerId?.toString(),
			created_at: question.createdAt,
			updated_at: question.updatedAt,
		};
	}
}
