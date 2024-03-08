import { Entity } from "@core/entities/entity";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { InstructorProps } from "./question.types";

export class Instructor extends Entity<InstructorProps> {
	static create(props: InstructorProps, id?: UniqueEntityId) {
		const instructor = new Instructor(props, id);

		return instructor;
	}
}
