import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Language} from "@/features/common/entities/languages.entity";
import {CreateLanguageResponse} from "../../commands/create-language/create-language.response";
import {GetLanguageByIdQuery} from "./get-language-by-id.query";

@QueryHandler(GetLanguageByIdQuery)
export class GetLanguageByIdHandler implements IQueryHandler<GetLanguageByIdQuery> {
    async execute(query: GetLanguageByIdQuery): Promise<CreateLanguageResponse> {
        const entity = await Language.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("language not found");
        return plainToInstance(CreateLanguageResponse, entity, {excludeExtraneousValues: true});
    }
}
