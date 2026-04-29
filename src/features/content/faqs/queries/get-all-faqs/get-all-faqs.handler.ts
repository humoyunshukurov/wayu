import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllFaqsQuery} from "./get-all-faqs.query";
import {GetAllFaqsResponse} from "./get-all-faqs.response";
import {FaqsEntity} from "@/features/common/entities/faqs.entity";

@QueryHandler(GetAllFaqsQuery)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsQuery> {
    async execute(query: GetAllFaqsQuery): Promise<GetAllFaqsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await FaqsEntity.find({skip, take});
        return plainToInstance(GetAllFaqsResponse, list, {excludeExtraneousValues: true});
    }
}