import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { InMemoryQuestionAttachmentsRepository } from "@test-repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create Questions", () => {
	beforeEach(() => {
		inMemoryQuestionsAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionsAttachmentsRepository,
		);
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to create a question", async () => {
		const result = await sut.execute({
			authorId: "1",
			content: "bla bla bla",
			title: "Title test",
			attachmentsIds: ["1", "2"],
		});

		const question = result?.value?.question;

		const itemHasBeenCreated = inMemoryQuestionsRepository.items.find(
			(item) => item.id === question?.id,
		);

		expect(result.isRight()).toBeTruthy();
		expect(question?.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
		expect(question?.slug.value).toEqual("title-test");
		expect(question?.title).toEqual("Title test");
		expect(question?.attachments.compareItems).toHaveLength(2);
		expect(question?.attachments.currentItems).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
			expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
		]);
	});
});
