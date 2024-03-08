import { Slug } from "./slug";

describe("Slug", () => {
	it("should be able to create a new slug from text", () => {
		const TITLE = "Example with a complex title and a strange phase";

		const slug = Slug.createFromText(TITLE);

		expect(slug.value).toEqual(
			"example-with-a-complex-title-and-a-strange-phase",
		);
	});
});
