import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {EventCategoriesEntity} from "@/features/common/entities/eventCategories.entity";
import {CreateEventCategoryResponse} from "@/features/content/event-categories/commands/create-event-category/create-event-category.response";
import {GetEventCategoryByIdQuery} from "./get-event-category-by-id.query";

@QueryHandler(GetEventCategoryByIdQuery)
export class GetEventCategoryByIdHandler implements IQueryHandler<GetEventCategoryByIdQuery> {
    async execute(query: GetEventCategoryByIdQuery): Promise<CreateEventCategoryResponse> {
        const entity = await EventCategoriesEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("event category not found");
        return plainToInstance(CreateEventCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
