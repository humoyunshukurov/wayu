import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {SocialLinksEntity} from "@/features/common/entities/socialLinks.entity";
import {CreateSocialLinkCommand} from "./create-social-link.command";
import {CreateSocialLinkResponse} from "./create-social-link.response";

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkHandler implements ICommandHandler<CreateSocialLinkCommand> {
    async execute(command: CreateSocialLinkCommand): Promise<CreateSocialLinkResponse> {
        const entity = SocialLinksEntity.create({
            title: command.title,
            icon: command.icon,
            link: command.link,
        } as SocialLinksEntity);
        await SocialLinksEntity.save(entity);

        return plainToInstance(CreateSocialLinkResponse, entity, {excludeExtraneousValues: true});
    }
}
