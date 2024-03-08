import { InMemoryNotificationsRepository } from "@test-repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send notification", () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
	});

	it("should be able to send a notification", async () => {
		const result = await sut.execute({
			recipientId: "1",
			content: "New notification",
			title: "Title test",
		});

		const notification = result?.value?.notification;

		const itemHasBeenCreated = inMemoryNotificationsRepository.items.find(
			(item) => item.id === notification?.id,
		);

		expect(result.isRight()).toBeTruthy();
		expect(notification?.id).toBeTruthy();
		expect(itemHasBeenCreated).toBeTruthy();
		expect(notification?.title).toEqual("Title test");
	});
});
