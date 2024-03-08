import { PaginationParams } from "@core/repositories/pagination-params";
import { AnswerComment } from "@forum-entities/answer-comment";

export interface AnswerCommentsRepository {
	findById(id: string): Promise<AnswerComment | null>;
	findManyByAnswerId(
		answerId: string,
		params: PaginationParams,
	): Promise<AnswerComment[]>;
	create(answerComment: AnswerComment): Promise<void>;
	delete(answerComment: AnswerComment): Promise<void>;
}
