import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {StaticInfoEntity} from "@/features/common/entities/staticInfo.entity";
import {UpdateStaticInfoCommand} from "./update-static-info.command";
import {UpdateStaticInfoResponse} from "./update-static-info.response";

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
    async execute(command: UpdateStaticInfoCommand): Promise<UpdateStaticInfoResponse> {
        let entity = await StaticInfoEntity.findOne({where: {}});

        if (!entity) {
            entity = StaticInfoEntity.create({
                appStoreLink: command.appStoreLink,
                playMarketLink: command.playMarketLink,
                aboutUs: command.aboutUs,
            } as StaticInfoEntity);
        } else {
            entity.appStoreLink = command.appStoreLink as string;
            entity.playMarketLink = command.playMarketLink as string;
            entity.aboutUs = command.aboutUs;
        }

        await StaticInfoEntity.save(entity);
        return plainToInstance(UpdateStaticInfoResponse, entity, {excludeExtraneousValues: true});
    }
}
