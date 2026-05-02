import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {DeleteNewsCategoryCommand} from "./delete-news-category.command";

@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand> {
    async execute(command: DeleteNewsCategoryCommand): Promise<void> {
        const entity = await NewsCategory.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("news category not found");

        await NewsCategory.remove(entity);
    }
}
