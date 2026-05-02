import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {SocialLinksEntity} from "@/features/common/entities/socialLinks.entity";
import {CreateSocialLinkResponse} from "@/features/social/social-links/commands/create-social-link/create-social-link.response";
import {UpdateSocialLinkCommand} from "./update-social-link.command";

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler implements ICommandHandler<UpdateSocialLinkCommand> {
    async execute(command: UpdateSocialLinkCommand): Promise<CreateSocialLinkResponse> {
        const entity = await SocialLinksEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("social link not found");

        entity.title = command.title;
        entity.icon = command.icon;
        entity.link = command.link;
        await SocialLinksEntity.save(entity);

        return plainToInstance(CreateSocialLinkResponse, entity, {excludeExtraneousValues: true});
    }
}
