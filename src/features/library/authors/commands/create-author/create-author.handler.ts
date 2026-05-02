import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {CreateAuthorCommand} from "./create-author.command";
import {CreateAuthorResponse} from "./create-author.response";

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
    async execute(command: CreateAuthorCommand): Promise<CreateAuthorResponse> {
        const entity = AuthorsEntity.create({fullName: command.fullName} as AuthorsEntity);
        await AuthorsEntity.save(entity);
        return plainToInstance(CreateAuthorResponse, entity, {excludeExtraneousValues: true});
    }
}
