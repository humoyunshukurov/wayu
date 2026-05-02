import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {GetNewsCategoryByIdQuery} from "./get-news-category-by-id.query";
import {CreateNewsCategoryResponse} from "@/features/news/news-category/commends/create-news-category.response";

@QueryHandler(GetNewsCategoryByIdQuery)
export class GetNewsCategoryByIdHandler implements IQueryHandler<GetNewsCategoryByIdQuery> {
    async execute(query: GetNewsCategoryByIdQuery): Promise<CreateNewsCategoryResponse> {
        const entity = await NewsCategory.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("news category not found");
        return plainToInstance(CreateNewsCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
