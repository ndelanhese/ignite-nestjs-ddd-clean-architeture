import { left, right } from "@core/either";
import { Encrypter } from "@forum-cryptography/encrypter";
import { HashComparer } from "@forum-cryptography/hash-comparer";
import { StudentsRepository } from "@forum-repositories/students-repository";
import { WrongCredentialsError } from "@forum-use-case-error/wrong-credentials-error";
import { Injectable } from "@nestjs/common";
import {
	AuthenticateStudentUseCaseProps,
	AuthenticateStudentUseCaseResponse,
} from "./authenticate-student.types";

@Injectable()
export class AuthenticateStudentUseCase {
	constructor(
		private studentsRepository: StudentsRepository,
		private hashComparer: HashComparer,
		private encrypter: Encrypter,
	) {}

	async execute({
		email,
		password,
	}: AuthenticateStudentUseCaseProps): Promise<AuthenticateStudentUseCaseResponse> {
		const student = await this.studentsRepository.findByEmail(email);

		if (!student) {
			return left(new WrongCredentialsError());
		}

		const isPasswordValid = await this.hashComparer.compare(
			password,
			student.password,
		);

		if (!isPasswordValid) {
			return left(new WrongCredentialsError());
		}

		const accessToken = await this.encrypter.encrypt({
			sub: student.id.toString(),
		});

		return right({ access_token: accessToken });
	}
}
