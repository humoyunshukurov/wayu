import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike, Not} from "typeorm";
import {EventCategoriesEntity} from "@/features/common/entities/eventCategories.entity";
import {CreateEventCategoryResponse} from "@/features/content/event-categories/commands/create-event-category/create-event-category.response";
import {UpdateEventCategoryCommand} from "./update-event-category.command";

@CommandHandler(UpdateEventCategoryCommand)
export class UpdateEventCategoryHandler implements ICommandHandler<UpdateEventCategoryCommand> {
    async execute(command: UpdateEventCategoryCommand): Promise<CreateEventCategoryResponse> {
        const entity = await EventCategoriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("event category not found");

        const titleTaken = await EventCategoriesEntity.existsBy({title: ILike(command.title), id: Not(command.id)});
        if (titleTaken) throw new BadRequestException("title is already taken");

        entity.title = command.title;
        await EventCategoriesEntity.save(entity);

        return plainToInstance(CreateEventCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
