import { CreateQuestionUseCase } from "@forum-use-cases/create-question";
import { CurrentUser, UserPayload } from "@infra/auth/current-user.decorator";
import { JwtAuthGuard } from "@infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@infra/http/pipes/zod-validation-pipe";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { z } from "zod";

const createQuestionBodySchema = z.object({
	title: z.string(),
	content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
	constructor(private readonly createQuestion: CreateQuestionUseCase) {}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body: CreateQuestionBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { content, title } = body;
		const { sub: userId } = user;

		await this.createQuestion.execute({
				authorId: userId,
				title,
				content,
				attachmentsIds: []
		});
	}
}
