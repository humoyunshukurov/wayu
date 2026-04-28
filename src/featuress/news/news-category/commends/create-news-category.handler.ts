
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NewsCategory} from "@/featuress/news/news-category/news-category.entity";
import {CreateNewsCategoryCommand} from "@/featuress/news/news-category/commends/create-new-category.command";
import {CreateNewsCategoryResponse} from "@/featuress/news/news-category/commends/create-news-category.response";

@CommandHandler(CreateNewsCategoryCommand)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryCommand> {

    async execute(command: CreateNewsCategoryCommand): Promise<CreateNewsCategoryResponse> {
        const alreadyExists = await NewsCategory.existsBy({title: ILike(command.title)});
        if (alreadyExists)
            throw new BadRequestException("Title is already taken");

        const newNewsCategory = NewsCategory.create({title: command.title} as NewsCategory);
        await NewsCategory.save(newNewsCategory);

        return plainToInstance(CreateNewsCategoryResponse, newNewsCategory, {excludeExtraneousValues: true});
    }
}