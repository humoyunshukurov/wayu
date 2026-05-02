import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {EventCategoriesEntity} from "@/features/common/entities/eventCategories.entity";
import {GetAllEventCategoriesQuery} from "./get-all-event-categories.query";
import {GetAllEventCategoriesResponse} from "./get-all-event-categories.response";

@QueryHandler(GetAllEventCategoriesQuery)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesQuery> {
    async execute(query: GetAllEventCategoriesQuery): Promise<GetAllEventCategoriesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await EventCategoriesEntity.find({skip, take});
        return plainToInstance(GetAllEventCategoriesResponse, list, {excludeExtraneousValues: true});
    }
}
