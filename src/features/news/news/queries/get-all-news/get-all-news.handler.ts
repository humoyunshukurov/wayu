import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NewsEntity} from "@/features/news/news/news.entity";
import {GetAllNewsQuery} from "./get-all-news.query";
import {GetAllNewsResponse} from "./get-all-news.response";

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {
    async execute(query: GetAllNewsQuery): Promise<GetAllNewsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await NewsEntity.find({skip, take});
        return plainToInstance(GetAllNewsResponse, list, {excludeExtraneousValues: true});
    }
}
