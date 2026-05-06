import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NewsEntity} from "@/features/news/news/news.entity";
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {CountriesEntity} from "@/features/common/entities/countries.entity";
import {CreateNewsCommand} from "./create-news.command";
import {CreateNewsResponse} from "./create-news.response";

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
    async execute(command: CreateNewsCommand): Promise<CreateNewsResponse> {
        const categoryExists = await NewsCategory.existsBy({id: command.categoryId});
        if (!categoryExists) throw new BadRequestException("news category not found");

        if (command.countryId) {
            const countryExists = await CountriesEntity.existsBy({id: command.countryId});
            if (!countryExists) throw new BadRequestException("country not found");
        }

        const entity = NewsEntity.create({
            categoryId: command.categoryId,
            countryId: command.countryId,
            title: command.title,
            image: command.image,
            date: command.date,
            content: command.content,
        } as unknown as NewsEntity);
        await NewsEntity.save(entity);

        return plainToInstance(CreateNewsResponse, entity, {excludeExtraneousValues: true});
    }
}
