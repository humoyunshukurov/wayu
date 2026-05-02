import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NewsEntity} from "@/features/news/news/news.entity";
import {DeleteNewsCommand} from "./delete-news.command";

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
    async execute(command: DeleteNewsCommand): Promise<void> {
        const entity = await NewsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("news not found");
        await NewsEntity.remove(entity);
    }
}
