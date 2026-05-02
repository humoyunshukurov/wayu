import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {CreateAuthorResponse} from "@/features/library/authors/commands/create-author/create-author.response";
import {GetAuthorByIdQuery} from "./get-author-by-id.query";

@QueryHandler(GetAuthorByIdQuery)
export class GetAuthorByIdHandler implements IQueryHandler<GetAuthorByIdQuery> {
    async execute(query: GetAuthorByIdQuery): Promise<CreateAuthorResponse> {
        const entity = await AuthorsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("author not found");
        return plainToInstance(CreateAuthorResponse, entity, {excludeExtraneousValues: true});
    }
}
