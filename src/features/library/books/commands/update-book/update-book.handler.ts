import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {CreateBookResponse} from "@/features/library/books/commands/create-book/create-book.response";
import {UpdateBookCommand} from "./update-book.command";

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
    async execute(command: UpdateBookCommand): Promise<CreateBookResponse> {
        const entity = await BooksEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("book not found");

        const authorExists = await AuthorsEntity.existsBy({id: command.authorId});
        if (!authorExists) throw new BadRequestException("author not found");

        const categoryExists = await BookCategoriesEntity.existsBy({id: command.categoryId});
        if (!categoryExists) throw new BadRequestException("book category not found");

        entity.authorId = command.authorId;
        entity.categoryId = command.categoryId;
        entity.title = command.title;
        entity.image = command.image;
        entity.description = command.description as string;
        entity.file = command.file;
        entity.pages = command.pages;
        entity.year = command.year;
        await BooksEntity.save(entity);

        return plainToInstance(CreateBookResponse, entity, {excludeExtraneousValues: true});
    }
}
