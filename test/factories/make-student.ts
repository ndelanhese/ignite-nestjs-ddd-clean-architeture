import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { faker } from "@faker-js/faker";
import { Student } from "@forum-entities/student";
import { StudentProps } from "@forum-entities/student/student.types";

export const makeStudent = (
	override: Partial<StudentProps> = {},
	id?: UniqueEntityId,
) => {
	const fakeStudentId = id ?? new UniqueEntityId(faker.vehicle.model());
	const newStudent = Student.create(
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			...override,
		},
		fakeStudentId,
	);

	return { fakeStudentId, newStudent };
};
