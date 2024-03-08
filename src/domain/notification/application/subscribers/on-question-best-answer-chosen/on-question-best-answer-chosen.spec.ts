import { SendNotificationUseCase } from "@notification-use-cases/send-notification";
import {
	SendNotificationUseCaseProps,
	SendNotificationUseCaseResponse,
} from "@notification-use-cases/send-notification/send-notification.types";
import { makeAnswer } from "@test-factories/make-answer";
import { makeQuestion } from "@test-factories/make-question";
import { InMemoryAnswerAttachmentsRepository } from "@test-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "@test-repositories/in-memory-answers-repository";
import { InMemoryNotificationsRepository } from "@test-repositories/in-memory-notifications-repository";
import { InMemoryQuestionAttachmentsRepository } from "@test-repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "@test-repositories/in-memory-questions-repository";
import { waitFor } from "@test-utils/wait-for";
import { MockInstance } from "vitest";
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
	[SendNotificationUseCaseProps],
	Promise<SendNotificationUseCaseResponse>
>;

describe("On question best answer chosen", () => {
	beforeEach(() => {
		inMemoryAnswersAttachmentRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryQuestionAttachmentRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswersAttachmentRepository,
		);
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentRepository,
		);
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sendNotificationUseCase = new SendNotificationUseCase(
			inMemoryNotificationsRepository,
		);

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

		new OnQuestionBestAnswerChosen(
			inMemoryAnswersRepository,
			sendNotificationUseCase,
		);
	});

	it("should send a notification when question has new best answer chosen", async () => {
		const { newQuestion } = makeQuestion();
		const { newAnswer } = makeAnswer({ questionId: newQuestion.id });

		await inMemoryQuestionsRepository.create(newQuestion);
		await inMemoryAnswersRepository.create(newAnswer);

		newQuestion.bestAnswerId = newAnswer.id;

		inMemoryQuestionsRepository.save(newQuestion);

		await waitFor(() => expect(sendNotificationExecuteSpy).toHaveBeenCalled());
	});
});
