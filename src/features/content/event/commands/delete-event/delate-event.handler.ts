import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteEventCommand} from "@/features/content/event/commands/delete-event/delate-event.commond";
import {EventEntity} from "@/features/common/entities/event.entity";


@CommandHandler(DeleteEventCommand)
export class DeleteEventHandler implements ICommandHandler<DeleteEventCommand> {
    async execute(command: DeleteEventCommand): Promise<void> {
        const entity = await EventEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("event not found");
        await EventEntity.remove(entity);
    }
}