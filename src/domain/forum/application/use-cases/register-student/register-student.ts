import { left, right } from "@core/either";
import { HashGenerator } from "@forum-cryptography/hash-generator";
import { Student } from "@forum-entities/student";
import { StudentsRepository } from "@forum-repositories/students-repository";
import { StudentAlreadyExistsError } from "@forum-use-case-error/student-already-exists-error";
import { Injectable } from "@nestjs/common";
import {
	RegisterStudentUseCaseProps,
	RegisterStudentUseCaseResponse,
} from "./register-student.types";

@Injectable()
export class RegisterStudentUseCase {
	constructor(
		private studentsRepository: StudentsRepository,
		private hashGenerator: HashGenerator,
	) {}

	async execute({
		email,
		name,
		password,
	}: RegisterStudentUseCaseProps): Promise<RegisterStudentUseCaseResponse> {
		const studentWithSameEmail =
			await this.studentsRepository.findByEmail(email);

		if (studentWithSameEmail) {
			return left(new StudentAlreadyExistsError(email));
		}

		const hashedPassword = await this.hashGenerator.hash(password);

		const student = Student.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.studentsRepository.create(student);

		return right({ student });
	}
}
