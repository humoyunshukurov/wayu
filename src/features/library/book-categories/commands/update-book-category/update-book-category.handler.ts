import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike, Not} from "typeorm";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {CreateBookCategoryResponse} from "@/features/library/book-categories/commands/create-book-category/create-book-category.response";
import {UpdateBookCategoryCommand} from "./update-book-category.command";

@CommandHandler(UpdateBookCategoryCommand)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryCommand> {
    async execute(command: UpdateBookCategoryCommand): Promise<CreateBookCategoryResponse> {
        const entity = await BookCategoriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("book category not found");

        const titleTaken = await BookCategoriesEntity.existsBy({title: ILike(command.title), id: Not(command.id)});
        if (titleTaken) throw new BadRequestException("title is already taken");

        entity.title = command.title;
        await BookCategoriesEntity.save(entity);

        return plainToInstance(CreateBookCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
