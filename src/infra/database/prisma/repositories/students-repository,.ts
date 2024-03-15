import { Student } from "@forum-entities/student";
import { StudentsRepository } from "@forum-repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findByEmail(email: string): Promise<Student | null> {
		const student = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!student) return null;

		return PrismaStudentMapper.toDomain(student);
	}

	async create(student: Student): Promise<void> {
		await this.prisma.user.create({
			data: PrismaStudentMapper.toPersistence(student),
		});
	}
}
