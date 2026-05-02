import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {CreateAuthorResponse} from "@/features/library/authors/commands/create-author/create-author.response";
import {UpdateAuthorCommand} from "./update-author.command";

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
    async execute(command: UpdateAuthorCommand): Promise<CreateAuthorResponse> {
        const entity = await AuthorsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("author not found");

        entity.fullName = command.fullName;
        await AuthorsEntity.save(entity);

        return plainToInstance(CreateAuthorResponse, entity, {excludeExtraneousValues: true});
    }
}
