import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TagsEntity} from "@/features/common/entities/tags.entity";
import {DeleteTagCommand} from "./delete-tag.command";

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
    async execute(command: DeleteTagCommand): Promise<void> {
        const entity = await TagsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("tag not found");
        await TagsEntity.remove(entity);
    }
}
