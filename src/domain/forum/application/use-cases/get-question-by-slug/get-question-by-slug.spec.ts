import { Slug } from "@forum-value-objects/slug";
import { makeQuestion } from "@test-factories/make-question";
import { InMemoryQuestionAttachmentsRepository } from "@test-repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question by slug", () => {
	beforeEach(() => {
		inMemoryQuestionsAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionsAttachmentsRepository,
		);
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to get a question by slug", async () => {
		const { newQuestion } = makeQuestion({
			slug: Slug.create("example-question"),
		});

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			slug: "example-question",
		});
		if (result.isLeft()) throw new Error("Question not found");
		const question = result.value?.question;

		expect(question).toBeTruthy();
		expect(question.id).toBeTruthy();
		expect(question.slug.value).toEqual(newQuestion.slug.value);
		expect(question.title).toEqual(newQuestion.title);
	});
});
