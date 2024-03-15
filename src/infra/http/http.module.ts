import { AuthenticateStudentUseCase } from "@forum-use-cases/authenticate-student";
import { CreateQuestionUseCase } from "@forum-use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "@forum-use-cases/fetch-recent-questions";
import { RegisterStudentUseCase } from "@forum-use-cases/register-student";
import { CryptographyModule } from "@infra/cryptography/cryptography.module";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionController } from "./controllers/fetch-recent-questions.controller";

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestionController,
		FetchRecentQuestionController,
	],
	providers: [
		CreateQuestionUseCase,
		FetchRecentQuestionsUseCase,
		RegisterStudentUseCase,
		AuthenticateStudentUseCase,
	],
})
export class HttpModule {}
