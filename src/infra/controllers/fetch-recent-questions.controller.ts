import { JwtAuthGuard } from "@infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@infra/pipes/zod-validation-pipe";
import { PrismaService } from "@infra/prisma/prisma.service";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { z } from "zod";

const pageQueryParamSchema = z
	.string()
	.optional()
	.default("1")
	.transform(Number)
	.pipe(z.number().min(1));

const perPageQueryParamSchema = z
	.string()
	.optional()
	.default("10")
	.transform(Number)
	.pipe(z.number().min(1));

const pageQueryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
const perPageQueryValidationPipe = new ZodValidationPipe(
	perPageQueryParamSchema,
);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
type PerPageQueryParamSchema = z.infer<typeof perPageQueryParamSchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
	constructor(private readonly prisma: PrismaService) {}

	@Get()
	async handle(
		@Query("page", pageQueryValidationPipe) page: PageQueryParamSchema,
		@Query("per_page", perPageQueryValidationPipe) per_page: PerPageQueryParamSchema,
	) {
		const perPage = per_page;

		const questions = await this.prisma.question.findMany({
			take: perPage,
			skip: (page - 1) * perPage,
			orderBy: {
				createdAt: "desc",
			},
		});

		return { questions };
	}
}
