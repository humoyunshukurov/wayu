import {plainToInstance} from "class-transformer";

import {GetAllNewsCategoriesQuery} from "./get-all-news-categories.query";
import {GetAllNewsCategoriesResponse} from "./get-all-news-categories.response";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {NewsCategory} from "@/features/common/entities/news-category.entity";


@QueryHandler(GetAllNewsCategoriesQuery)
export class GetAllNewsCategoriesHandler implements IQueryHandler<GetAllNewsCategoriesQuery> {
    async execute(query: GetAllNewsCategoriesQuery): Promise<GetAllNewsCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const categories = await NewsCategory.find({skip: skip, take: take});
        return plainToInstance(GetAllNewsCategoriesResponse, categories, {excludeExtraneousValues: true});
    }
}