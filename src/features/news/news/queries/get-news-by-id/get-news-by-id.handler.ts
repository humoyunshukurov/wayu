import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NewsEntity} from "@/features/news/news/news.entity";
import {CreateNewsResponse} from "@/features/news/news/commands/create-news/create-news.response";
import {GetNewsByIdQuery} from "./get-news-by-id.query";

@QueryHandler(GetNewsByIdQuery)
export class GetNewsByIdHandler implements IQueryHandler<GetNewsByIdQuery> {
    async execute(query: GetNewsByIdQuery): Promise<CreateNewsResponse> {
        const entity = await NewsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("news not found");
        return plainToInstance(CreateNewsResponse, entity, {excludeExtraneousValues: true});
    }
}
