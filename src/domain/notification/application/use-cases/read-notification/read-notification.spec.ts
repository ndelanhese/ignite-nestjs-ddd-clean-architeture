import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { NotAllowedError } from "@errors/not-allowed-error";
import { makeNotification } from "@test-factories/make-notification";
import { InMemoryNotificationsRepository } from "@test-repositories/in-memory-notifications-repository";
import { ReadNotificationUseCase } from "./read-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Read notification", () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
	});

	it("should be able to read a notification", async () => {
		const { newNotification } = makeNotification();

		await inMemoryNotificationsRepository.create(newNotification);

		const result = await sut.execute({
			recipientId: newNotification.recipientId.toString(),
			notificationId: newNotification.id.toString(),
		});

		const createdItem = inMemoryNotificationsRepository.items.find(
			(item) => item.id.toString() === newNotification?.id.toString(),
		);

		expect(result.isRight()).toBeTruthy();
		expect(newNotification?.id).toBeTruthy();
		expect(createdItem).toBeTruthy();
		expect(createdItem?.readAt).toEqual(expect.any(Date));
	});

	it("should not be able to read a notification from another author", async () => {
		const recipientId = new UniqueEntityId("notification-author");
		const notificationId = new UniqueEntityId("notification-id");
		const { newNotification } = makeNotification(
			{ recipientId },
			notificationId,
		);

		await inMemoryNotificationsRepository.create(newNotification);

		const result = await sut.execute({
			recipientId: "wrong-author-id",
			notificationId: notificationId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
