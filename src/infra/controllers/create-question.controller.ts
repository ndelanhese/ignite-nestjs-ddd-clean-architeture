import { CurrentUser, UserPayload } from "@infra/auth/current-user.decorator";
import { JwtAuthGuard } from "@infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@infra/pipes/zod-validation-pipe";
import { PrismaService } from "@infra/prisma/prisma.service";
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
	constructor(private readonly prisma: PrismaService) {}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body: CreateQuestionBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { content, title } = body;
		const { sub: userId } = user;

		await this.prisma.question.create({
			data: {
				authorId: userId,
				title,
				content,
				slug: this.convertToSlug(title),
			},
		});
	}

	private convertToSlug(title: string): string {
		return title
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u836f]/g, "")
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-");
	}
}
