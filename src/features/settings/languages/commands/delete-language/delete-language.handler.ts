import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Language} from "@/features/common/entities/languages.entity";
import {DeleteLanguageCommand} from "./delete-language.command";

@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {
    async execute(command: DeleteLanguageCommand): Promise<void> {
        const entity = await Language.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("language not found");
        await Language.remove(entity);
    }
}
