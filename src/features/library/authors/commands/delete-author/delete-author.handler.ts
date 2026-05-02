import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {DeleteAuthorCommand} from "./delete-author.command";

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
    async execute(command: DeleteAuthorCommand): Promise<void> {
        const entity = await AuthorsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("author not found");

        const hasBooks = await BooksEntity.existsBy({authorId: command.id});
        if (hasBooks) throw new BadRequestException("author has attached books");

        await AuthorsEntity.remove(entity);
    }
}
