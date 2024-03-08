import { UseCaseError } from "@core/errors";

export class NotAllowedError extends Error implements UseCaseError {
	constructor() {
		super("Not allowed.");
	}
}
