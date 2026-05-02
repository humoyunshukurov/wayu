import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {DeleteBookCategoryCommand} from "./delete-book-category.command";

@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
    async execute(command: DeleteBookCategoryCommand): Promise<void> {
        const entity = await BookCategoriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("book category not found");

        const hasBooks = await BooksEntity.existsBy({categoryId: command.id});
        if (hasBooks) throw new BadRequestException("book category has attached books");

        await BookCategoriesEntity.remove(entity);
    }
}
