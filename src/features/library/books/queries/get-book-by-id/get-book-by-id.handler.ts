import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {CreateBookResponse} from "@/features/library/books/commands/create-book/create-book.response";
import {GetBookByIdQuery} from "./get-book-by-id.query";

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler implements IQueryHandler<GetBookByIdQuery> {
    async execute(query: GetBookByIdQuery): Promise<CreateBookResponse> {
        const entity = await BooksEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("book not found");
        return plainToInstance(CreateBookResponse, entity, {excludeExtraneousValues: true});
    }
}
