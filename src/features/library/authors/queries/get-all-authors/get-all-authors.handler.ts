import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {GetAllAuthorsQuery} from "./get-all-authors.query";
import {GetAllAuthorsResponse} from "./get-all-authors.response";

@QueryHandler(GetAllAuthorsQuery)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsQuery> {
    async execute(query: GetAllAuthorsQuery): Promise<GetAllAuthorsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await AuthorsEntity.find({skip, take});
        return plainToInstance(GetAllAuthorsResponse, list, {excludeExtraneousValues: true});
    }
}
