import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ILike} from "typeorm";
import {TagsEntity} from "@/features/common/entities/tags.entity";
import {CreateTagCommand} from "./create-tag.command";
import {CreateTagResponse} from "./create-tag.response";

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
    async execute(command: CreateTagCommand): Promise<CreateTagResponse> {
        const alreadyExists = await TagsEntity.existsBy({title: ILike(command.title)});
        if (alreadyExists) throw new BadRequestException("title is already taken");

        const entity = TagsEntity.create({title: command.title} as TagsEntity);
        await TagsEntity.save(entity);

        return plainToInstance(CreateTagResponse, entity, {excludeExtraneousValues: true});
    }
}
