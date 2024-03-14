import { faker } from "@faker-js/faker";
import { makeStudent } from "@test-factories/make-student";
import { InMemoryStudentsRepository } from "@test-repositories/in-memory-students-repository";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { AuthenticateStudentUseCase } from "./authenticate-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateStudentUseCase;

describe("Authenticate Student", () => {
	beforeEach(() => {
		inMemoryStudentsRepository = new InMemoryStudentsRepository();
		fakeHasher = new FakeHasher();
		fakeEncrypter = new FakeEncrypter();
		sut = new AuthenticateStudentUseCase(
			inMemoryStudentsRepository,
			fakeHasher,
			fakeEncrypter,
		);
	});

	it("should be able to authenticate a student", async () => {
		const studentEmail = faker.internet.email();
		const studentPassword = faker.internet.password();
		const studentHashedPassword = await fakeHasher.hash(studentPassword);
		const { newStudent } = makeStudent({
			email: studentEmail,
			password: studentHashedPassword,
		});

		inMemoryStudentsRepository.create(newStudent);

		const result = await sut.execute({
			email: studentEmail,
			password: studentPassword,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			access_token: expect.any(String),
		});
	});
});
