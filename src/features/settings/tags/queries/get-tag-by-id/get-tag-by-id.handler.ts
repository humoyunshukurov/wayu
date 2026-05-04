import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {TagsEntity} from "@/features/common/entities/tags.entity";
import {CreateTagResponse} from "../../commands/create-tag/create-tag.response";
import {GetTagByIdQuery} from "./get-tag-by-id.query";

@QueryHandler(GetTagByIdQuery)
export class GetTagByIdHandler implements IQueryHandler<GetTagByIdQuery> {
    async execute(query: GetTagByIdQuery): Promise<CreateTagResponse> {
        const entity = await TagsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("tag not found");
        return plainToInstance(CreateTagResponse, entity, {excludeExtraneousValues: true});
    }
}
