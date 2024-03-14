import { Entity } from "@core/entities/entity";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { StudentProps } from "./student.types";

export class Student extends Entity<StudentProps> {
	static create(props: StudentProps, id?: UniqueEntityId) {
		const student = new Student(props, id);

		return student;
	}

	get name() {
		return this.props.name;
	}

	get email() {
		return this.props.email;
	}

	get password() {
		return this.props.password;
	}
}
