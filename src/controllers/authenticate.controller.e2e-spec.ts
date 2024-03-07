import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Authenticate (E2E)", () => {
	let app: INestApplication;
	let userData: { name: string; email: string; password: string };

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	beforeEach(async () => {
		userData = {
			name: "John Doe",
			email: "john.doe@email.com",
			password: "test",
		};

		await request(app.getHttpServer()).post("/accounts").send(userData);
	});

	test("[POST] /sessions", async () => {
		const response = await request(app.getHttpServer())
			.post("/sessions")
			.send({ email: userData.email, password: userData.password });

		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			access_token: expect.any(String),
		});
	});
});
