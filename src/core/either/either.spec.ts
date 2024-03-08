import { left, right } from "./either";
import { Either } from "./either.types";

describe("Functional error handling", () => {
	const doSomething = (shouldSuccess: boolean): Either<string, string> => {
		if (shouldSuccess) {
			return right("success");
		}

		return left("error");
	};

	test("success result", () => {
		const successResult = doSomething(true);

		expect(successResult.isRight()).toBe(true);
	});

	test("error result", () => {
		const errorResult = doSomething(false);

		expect(errorResult.isLeft()).toBe(true);
		expect(errorResult.isRight()).toBe(false);
	});
});
