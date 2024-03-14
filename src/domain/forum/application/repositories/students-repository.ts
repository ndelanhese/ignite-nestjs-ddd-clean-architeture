import { Student } from "@forum-entities/student";

export abstract class StudentsRepository {
	abstract findByEmail(email: string): Promise<Student | null>;
	abstract create(student: Student): Promise<void>;
}
