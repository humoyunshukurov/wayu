import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Language} from "@/features/common/entities/languages.entity";
import {CreateLanguageResponse} from "@/features/settings/languages/commands/create-language/create-language.response";
import {GetAllLanguagesQuery} from "./get-all-languages.query";

@QueryHandler(GetAllLanguagesQuery)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesQuery> {
    async execute(): Promise<CreateLanguageResponse[]> {
        const list = await Language.find();
        return plainToInstance(CreateLanguageResponse, list, {excludeExtraneousValues: true});
    }
}
