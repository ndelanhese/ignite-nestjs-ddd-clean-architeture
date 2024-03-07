import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("Please provide a DATABASE_URL environment variable");
}

const generateUniqueDatabaseURL = (schemaId: string) => {
	const url = new URL(DATABASE_URL);

	url.searchParams.set("schema", schemaId);

	return url.toString();
};

const schemaId = randomUUID();

beforeAll(async () => {
	const databaseURL = generateUniqueDatabaseURL(schemaId);

	process.env.DATABASE_URL = databaseURL;

	execSync("bun prisma migrate deploy");
});

afterAll(async () => {
	await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
	await prisma.$disconnect();
});
