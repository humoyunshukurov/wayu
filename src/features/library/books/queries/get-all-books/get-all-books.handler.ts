import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {GetAllBooksQuery} from "./get-all-books.query";
import {GetAllBooksResponse} from "./get-all-books.response";

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
    async execute(query: GetAllBooksQuery): Promise<GetAllBooksResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await BooksEntity.find({skip, take});
        return plainToInstance(GetAllBooksResponse, list, {excludeExtraneousValues: true});
    }
}
