import { AuthenticateStudentUseCase } from "@forum-use-cases/authenticate-student";
import { ZodValidationPipe } from "@infra/http/pipes/zod-validation-pipe";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";

const authenticateBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
	constructor(private readonly authenticateStudent: AuthenticateStudentUseCase) {}

	@Post()
	@UsePipes(new ZodValidationPipe(authenticateBodySchema))
	async handle(@Body() body: AuthenticateBodySchema) {
		const {email,password} = body

  const result = await this.authenticateStudent.execute({
    email, password
  })

  if(result.isLeft()){
    throw new Error()
  }

  const {access_token} = result.value
    return {access_token}
	}
}
