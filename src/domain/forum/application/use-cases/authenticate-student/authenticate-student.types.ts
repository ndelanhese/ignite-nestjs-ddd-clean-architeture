import { Either } from "@core/either";
import { WrongCredentialsError } from "@forum-use-case-error/wrong-credentials-error";

export type AuthenticateStudentUseCaseProps = {
	email: string;
	password: string;
};

export type AuthenticateStudentUseCaseResponse = Either<
	WrongCredentialsError,
	{
		access_token: string;
	}
>;
