import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike} from "typeorm";
import {EventCategoriesEntity} from "@/features/common/entities/eventCategories.entity";
import {CreateEventCategoryCommand} from "./create-event-category.command";
import {CreateEventCategoryResponse} from "./create-event-category.response";

@CommandHandler(CreateEventCategoryCommand)
export class CreateEventCategoryHandler implements ICommandHandler<CreateEventCategoryCommand> {
    async execute(command: CreateEventCategoryCommand): Promise<CreateEventCategoryResponse> {
        const alreadyExists = await EventCategoriesEntity.existsBy({title: ILike(command.title)});
        if (alreadyExists) throw new BadRequestException("title is already taken");

        const entity = EventCategoriesEntity.create({title: command.title} as EventCategoriesEntity);
        await EventCategoriesEntity.save(entity);

        return plainToInstance(CreateEventCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
