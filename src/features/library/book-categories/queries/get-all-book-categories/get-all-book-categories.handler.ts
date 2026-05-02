import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {GetAllBookCategoriesQuery} from "./get-all-book-categories.query";
import {GetAllBookCategoriesResponse} from "./get-all-book-categories.response";

@QueryHandler(GetAllBookCategoriesQuery)
export class GetAllBookCategoriesHandler implements IQueryHandler<GetAllBookCategoriesQuery> {
    async execute(query: GetAllBookCategoriesQuery): Promise<GetAllBookCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await BookCategoriesEntity.find({skip, take});
        return plainToInstance(GetAllBookCategoriesResponse, list, {excludeExtraneousValues: true});
    }
}
