import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Language} from "@/features/common/entities/languages.entity";
import {CreateLanguageResponse} from "@/features/settings/languages/commands/create-language/create-language.response";
import {UpdateLanguageCommand} from "./update-language.command";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {
    async execute(command: UpdateLanguageCommand): Promise<CreateLanguageResponse> {
        const entity = await Language.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("language not found");

        entity.title = command.title;
        await Language.save(entity);

        return plainToInstance(CreateLanguageResponse, entity, {excludeExtraneousValues: true});
    }
}
