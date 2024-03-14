import { Student } from "@forum-entities/student";
import { StudentsRepository } from "@forum-repositories/students-repository";

export class InMemoryStudentsRepository implements StudentsRepository {
	public items: Student[] = [];

	async findByEmail(email: string): Promise<Student | null> {
		return this.items.find((item) => item.email === email) ?? null;
	}

	async create(student: Student) {
		this.items.push(student);
	}
}
