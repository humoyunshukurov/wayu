import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {DeleteBookCommand} from "./delete-book.command";

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
    async execute(command: DeleteBookCommand): Promise<void> {
        const entity = await BooksEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("book not found");
        await BooksEntity.remove(entity);
    }
}
