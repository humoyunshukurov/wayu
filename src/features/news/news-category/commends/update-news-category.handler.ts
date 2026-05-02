import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike, Not} from "typeorm";
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {UpdateNewsCategoryCommand} from "./update-news-category.command";
import {CreateNewsCategoryResponse} from "./create-news-category.response";

@CommandHandler(UpdateNewsCategoryCommand)
export class UpdateNewsCategoryHandler implements ICommandHandler<UpdateNewsCategoryCommand> {
    async execute(command: UpdateNewsCategoryCommand): Promise<CreateNewsCategoryResponse> {
        const entity = await NewsCategory.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("news category not found");

        const titleTaken = await NewsCategory.existsBy({title: ILike(command.title), id: Not(command.id)});
        if (titleTaken) throw new BadRequestException("title is already taken");

        entity.title = command.title;
        await NewsCategory.save(entity);

        return plainToInstance(CreateNewsCategoryResponse, entity, {excludeExtraneousValues: true});
    }
}
