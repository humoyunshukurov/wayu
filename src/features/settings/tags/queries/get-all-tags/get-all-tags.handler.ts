import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {TagsEntity} from "@/features/common/entities/tags.entity";
import {CreateTagResponse} from "@/features/settings/tags/commands/create-tag/create-tag.response";
import {GetAllTagsQuery} from "./get-all-tags.query";

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
    async execute(): Promise<CreateTagResponse[]> {
        const list = await TagsEntity.find();
        return plainToInstance(CreateTagResponse, list, {excludeExtraneousValues: true});
    }
}
