import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike} from "typeorm";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import {CreateBookCategoryCommand} from "./create-book-category.command";
import {CreateBookCategoryResponse} from "./create-book-category.response";

@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
    async execute(command: CreateBookCategoryCommand): Promise<CreateBookCategoryResponse> {
        const alreadyExists = await BookCategoriesEntity.existsBy({title: ILike(command.title)});
        if (alreadyExists) throw new BadRequestException("title is already taken");

        const entity = BookCategoriesEntity.create({title: command.title} as BookCategoriesEntity);
        await BookCategoriesEntity.save(entity);

        return plainToInstance(CreateBookCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
