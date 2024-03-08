import { PaginationParams } from "@core/repositories/pagination-params";
import { Answer } from "@forum-entities/answer";

export interface AnswersRepository {
	findById(id: string): Promise<Answer | null>;
	findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<Answer[]>;
	save(question: Answer): Promise<void>;
	create(answer: Answer): Promise<void>;
	delete(question: Answer): Promise<void>;
}
