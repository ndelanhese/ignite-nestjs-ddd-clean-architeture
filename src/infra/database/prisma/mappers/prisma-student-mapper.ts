import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { Student } from "@forum-entities/student";
import { Prisma, User as PrismaUser } from "@prisma/client";

export class PrismaStudentMapper {
	static toDomain(raw: PrismaUser): Student {
		return Student.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.password,
			},
			new UniqueEntityId(raw.id),
		);
	}

	static toPersistence(raw: Student): Prisma.UserUncheckedCreateInput {
		return {
			id: raw.id.toString(),
			name: raw.name,
			email: raw.email,
			password: raw.password,
		};
	}
}
