import { PaginationParams } from "@core/repositories/pagination-params";
import { Question } from "@forum-entities/question";

export interface QuestionsRepository {
	findBySlug(slug: string): Promise<Question | null>;
	findById(id: string): Promise<Question | null>;
	findManyRecent(params: PaginationParams): Promise<Question[]>;
	save(question: Question): Promise<void>;
	create(question: Question): Promise<void>;
	delete(question: Question): Promise<void>;
}
