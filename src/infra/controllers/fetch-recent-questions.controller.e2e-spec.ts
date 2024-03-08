import { AppModule } from "@infra/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { expect } from "vitest";

describe("Fetch recent questions (E2E)", () => {
	let app: INestApplication;
	let accessToken: string;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	beforeEach(async () => {
		const userData = {
			name: "John Doe",
			email: "john.doe@email.com",
			password: "test",
		};
		await request(app.getHttpServer()).post("/accounts").send(userData);
		const response = await request(app.getHttpServer()).post("/sessions").send({
			email: userData.email,
			password: userData.password,
		});
		accessToken = response.body.access_token;

		const questionData = {
			title: "Question title",
			content: "Question content",
		};

		const promises = [...Array(2)].map((_, index) => {
			return request(app.getHttpServer())
				.post("/questions")
				.set("Authorization", `Bearer ${accessToken}`)
				.send({
					title: `${questionData.title} - ${index + 1}`,
					content: `${questionData.content} - ${index + 1}`,
				});
		});

		await Promise.all(promises);
	});

	test("[GET] /questions", async () => {
		const response = await request(app.getHttpServer())
			.get("/questions")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			questions: [
				expect.objectContaining({ title: "Question title - 2" }),
				expect.objectContaining({ title: "Question title - 1" }),
			],
		});
	});
});
