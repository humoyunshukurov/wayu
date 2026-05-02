import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {UsefulLinksEntity} from "@/features/common/entities/usefulLinks.entity";
import {CreateUsefulLinkCommand} from "./create-useful-link.command";
import {CreateUsefulLinkResponse} from "./create-useful-link.response";

@CommandHandler(CreateUsefulLinkCommand)
export class CreateUsefulLinkHandler implements ICommandHandler<CreateUsefulLinkCommand> {
    async execute(command: CreateUsefulLinkCommand): Promise<CreateUsefulLinkResponse> {
        const entity = UsefulLinksEntity.create({
            title: command.title,
            icon: command.icon,
            link: command.link,
        } as UsefulLinksEntity);
        await UsefulLinksEntity.save(entity);

        return plainToInstance(CreateUsefulLinkResponse, entity, {excludeExtraneousValues: true});
    }
}
