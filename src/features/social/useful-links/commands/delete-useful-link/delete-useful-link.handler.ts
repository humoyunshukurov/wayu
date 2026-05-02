import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UsefulLinksEntity} from "@/features/common/entities/usefulLinks.entity";
import {DeleteUsefulLinkCommand} from "./delete-useful-link.command";

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand> {
    async execute(command: DeleteUsefulLinkCommand): Promise<void> {
        const entity = await UsefulLinksEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("useful link not found");
        await UsefulLinksEntity.remove(entity);
    }
}
