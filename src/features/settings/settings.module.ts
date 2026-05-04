import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {StaticInfoController} from "./static-info/static-info.controller";
import {UpdateStaticInfoHandler} from "./static-info/commands/update-static-info/update-static-info.handler";
import {GetStaticInfoHandler} from "./static-info/queries/get-static-info/get-static-info.handler";
import {QuestionsController} from "./questions/questions.controller";
import {UpdateQuestionStatusHandler} from "./questions/commands/update-question-status/update-question-status.handler";
import {GetAllQuestionsHandler} from "./questions/queries/get-all-questions/get-all-questions.handler";
import {GetQuestionByIdHandler} from "./questions/queries/get-question-by-id/get-question-by-id.handler";
import {LanguagesController} from "./languages/languages.controller";
import {CreateLanguageHandler} from "./languages/commands/create-language/create-language.handler";
import {UpdateLanguageHandler} from "./languages/commands/update-language/update-language.handler";
import {DeleteLanguageHandler} from "./languages/commands/delete-language/delete-language.handler";
import {GetAllLanguagesHandler} from "./languages/queries/get-all-languages/get-all-languages.handler";
import {GetLanguageByIdHandler} from "./languages/queries/get-language-by-id/get-language-by-id.handler";
import {TagsController} from "./tags/tags.controller";
import {CreateTagHandler} from "./tags/commands/create-tag/create-tag.handler";
import {UpdateTagHandler} from "./tags/commands/update-tag/update-tag.handler";
import {DeleteTagHandler} from "./tags/commands/delete-tag/delete-tag.handler";
import {GetAllTagsHandler} from "./tags/queries/get-all-tags/get-all-tags.handler";
import {GetTagByIdHandler} from "./tags/queries/get-tag-by-id/get-tag-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [StaticInfoController, QuestionsController, LanguagesController, TagsController],
    providers: [
        UpdateStaticInfoHandler,
        GetStaticInfoHandler,
        UpdateQuestionStatusHandler,
        GetAllQuestionsHandler,
        GetQuestionByIdHandler,
        CreateLanguageHandler,
        UpdateLanguageHandler,
        DeleteLanguageHandler,
        GetAllLanguagesHandler,
        GetLanguageByIdHandler,
        CreateTagHandler,
        UpdateTagHandler,
        DeleteTagHandler,
        GetAllTagsHandler,
        GetTagByIdHandler,
    ],
})
export class SettingsModule {}
