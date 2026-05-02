import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SocialLinksEntity} from "@/features/common/entities/socialLinks.entity";
import {DeleteSocialLinkCommand} from "./delete-social-link.command";

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler implements ICommandHandler<DeleteSocialLinkCommand> {
    async execute(command: DeleteSocialLinkCommand): Promise<void> {
        const entity = await SocialLinksEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("social link not found");
        await SocialLinksEntity.remove(entity);
    }
}
