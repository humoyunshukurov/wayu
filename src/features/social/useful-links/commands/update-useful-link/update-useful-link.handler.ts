import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {UsefulLinksEntity} from "@/features/common/entities/usefulLinks.entity";
import {CreateUsefulLinkResponse} from "@/features/social/useful-links/commands/create-useful-link/create-useful-link.response";
import {UpdateUsefulLinkCommand} from "./update-useful-link.command";

@CommandHandler(UpdateUsefulLinkCommand)
export class UpdateUsefulLinkHandler implements ICommandHandler<UpdateUsefulLinkCommand> {
    async execute(command: UpdateUsefulLinkCommand): Promise<CreateUsefulLinkResponse> {
        const entity = await UsefulLinksEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("useful link not found");

        entity.title = command.title;
        entity.icon = command.icon;
        entity.link = command.link;
        await UsefulLinksEntity.save(entity);

        return plainToInstance(CreateUsefulLinkResponse, entity, {excludeExtraneousValues: true});
    }
}
