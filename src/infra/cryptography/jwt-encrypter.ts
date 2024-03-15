import { Encrypter } from "@forum-cryptography/encrypter";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtEncrypter implements Encrypter {
	constructor(private readonly jwtService: JwtService) {}

	async encrypt(payload: Record<string, unknown>): Promise<string> {
		return await this.jwtService.signAsync(payload);
	}
}
