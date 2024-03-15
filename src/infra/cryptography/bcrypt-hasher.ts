import { HashComparer } from "@forum-cryptography/hash-comparer";
import { HashGenerator } from "@forum-cryptography/hash-generator";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
	private readonly HASH_SALT_LENGTH = 8;

	async compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}

	async hash(plain: string): Promise<string> {
		return await hash(plain, this.HASH_SALT_LENGTH);
	}
}
