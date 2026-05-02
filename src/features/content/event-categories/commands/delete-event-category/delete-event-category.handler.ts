import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {EventCategoriesEntity} from "@/features/common/entities/eventCategories.entity";
import {EventEntity} from "@/features/common/entities/event.entity";
import {DeleteEventCategoryCommand} from "./delete-event-category.command";

@CommandHandler(DeleteEventCategoryCommand)
export class DeleteEventCategoryHandler implements ICommandHandler<DeleteEventCategoryCommand> {
    async execute(command: DeleteEventCategoryCommand): Promise<void> {
        const entity = await EventCategoriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("event category not found");

        const hasEvents = await EventEntity.existsBy({categoryId: command.id});
        if (hasEvents) throw new BadRequestException("event category has attached events");

        await EventCategoriesEntity.remove(entity);
    }
}
