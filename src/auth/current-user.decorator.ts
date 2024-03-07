import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import type { TokenPayload } from "./jwt.strategy";

export type UserPayload = TokenPayload

export const CurrentUser = createParamDecorator(
	(_: unknown, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();

		return request.user as UserPayload;
	},
);
