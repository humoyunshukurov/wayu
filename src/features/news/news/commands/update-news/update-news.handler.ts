import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NewsEntity} from "@/features/news/news/news.entity";
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {CountriesEntity} from "@/features/common/entities/countries.entity";
import {CreateNewsResponse} from "@/features/news/news/commands/create-news/create-news.response";
import {UpdateNewsCommand} from "./update-news.command";

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
    async execute(command: UpdateNewsCommand): Promise<CreateNewsResponse> {
        const entity = await NewsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("news not found");

        const categoryExists = await NewsCategory.existsBy({id: command.categoryId});
        if (!categoryExists) throw new BadRequestException("news category not found");

        const countryExists = await CountriesEntity.existsBy({id: command.countryId});
        if (!countryExists) throw new BadRequestException("country not found");

        entity.categoryId = command.categoryId;
        entity.countryId = command.countryId;
        entity.title = command.title;
        await NewsEntity.save(entity);

        return plainToInstance(CreateNewsResponse, entity, {excludeExtraneousValues: true});
    }
}
