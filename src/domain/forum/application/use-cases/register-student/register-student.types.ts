import { Either } from "@core/either";
import { Student } from "@forum-entities/student";
import { StudentAlreadyExistsError } from "@forum-use-case-error/student-already-exists-error";

export type RegisterStudentUseCaseProps = {
	name: string;
	email: string;
	password: string;
};

export type RegisterStudentUseCaseResponse = Either<
	StudentAlreadyExistsError,
	{
		student: Student;
	}
>;
