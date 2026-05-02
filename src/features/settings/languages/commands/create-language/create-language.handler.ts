import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Language} from "@/features/common/entities/languages.entity";
import {CreateLanguageCommand} from "./create-language.command";
import {CreateLanguageResponse} from "./create-language.response";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand> {
    async execute(command: CreateLanguageCommand): Promise<CreateLanguageResponse> {
        const entity = Language.create({title: command.title} as Language);
        await Language.save(entity);
        return plainToInstance(CreateLanguageResponse, entity, {excludeExtraneousValues: true});
    }
}
