import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BooksEntity} from "@/features/common/entities/books.entity";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {CreateBookCommand} from "./create-book.command";
import {CreateBookResponse} from "./create-book.response";

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
    async execute(command: CreateBookCommand): Promise<CreateBookResponse> {
        const authorExists = await AuthorsEntity.existsBy({id: command.authorId});
        if (!authorExists) throw new BadRequestException("author not found");

        const categoryExists = await BookCategoriesEntity.existsBy({id: command.categoryId});
        if (!categoryExists) throw new BadRequestException("book category not found");

        const entity = BooksEntity.create({
            authorId: command.authorId,
            categoryId: command.categoryId,
            title: command.title,
            image: command.image,
            description: command.description,
            file: command.file,
            pages: command.pages,
            year: command.year,
        } as BooksEntity);
        await BooksEntity.save(entity);

        return plainToInstance(CreateBookResponse, entity, {excludeExtraneousValues: true});
    }
}
