import { Entity } from "@core/entities/entity";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { InstructorProps } from "@forum-entities/instructor/question.types";
import { StudentProps } from "./student.types";

export class Student extends Entity<InstructorProps> {
	static create(props: StudentProps, id?: UniqueEntityId) {
		const student = new Student(props, id);

		return student;
	}
}
