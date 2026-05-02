import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {CreateBookCategoryResponse} from "@/features/library/book-categories/commands/create-book-category/create-book-category.response";
import {GetBookCategoryByIdQuery} from "./get-book-category-by-id.query";

@QueryHandler(GetBookCategoryByIdQuery)
export class GetBookCategoryByIdHandler implements IQueryHandler<GetBookCategoryByIdQuery> {
    async execute(query: GetBookCategoryByIdQuery): Promise<CreateBookCategoryResponse> {
        const entity = await BookCategoriesEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("book category not found");
        return plainToInstance(CreateBookCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
