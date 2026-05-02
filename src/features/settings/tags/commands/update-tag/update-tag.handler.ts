import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike, Not} from "typeorm";
import {TagsEntity} from "@/features/common/entities/tags.entity";
import {CreateTagResponse} from "@/features/settings/tags/commands/create-tag/create-tag.response";
import {UpdateTagCommand} from "./update-tag.command";

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
    async execute(command: UpdateTagCommand): Promise<CreateTagResponse> {
        const entity = await TagsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("tag not found");

        const titleTaken = await TagsEntity.existsBy({title: ILike(command.title), id: Not(command.id)});
        if (titleTaken) throw new BadRequestException("title is already taken");

        entity.title = command.title;
        await TagsEntity.save(entity);

        return plainToInstance(CreateTagResponse, entity, {excludeExtraneousValues: true});
    }
}
