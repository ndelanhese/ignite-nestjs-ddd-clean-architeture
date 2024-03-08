import { AppModule } from "@infra/app.module";
import { PrismaService } from "@infra/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Create question (E2E)", () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let accessToken: string;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();

		prisma = moduleRef.get(PrismaService);

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
	});

	test("[POST] /questions", async () => {
		const questionData = {
			title: "Question title",
			content: "Question content",
		};

		const response = await request(app.getHttpServer())
			.post("/questions")
			.set("Authorization", `Bearer ${accessToken}`)
			.send(questionData);

		expect(response.statusCode).toBe(201);

		const questionOnDatabase = await prisma.question.findFirst({
			where: {
				title: questionData.title,
			},
		});

		expect(questionOnDatabase).toBeTruthy();
	});
});
