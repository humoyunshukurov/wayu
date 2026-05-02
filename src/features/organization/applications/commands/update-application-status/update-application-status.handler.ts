import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ApplicationsEntity} from "@/features/common/entities/applications.entity";
import {CreateApplicationResponse} from "@/features/organization/applications/commands/create-application/create-application.response";
import {UpdateApplicationStatusCommand} from "./update-application-status.command";

@CommandHandler(UpdateApplicationStatusCommand)
export class UpdateApplicationStatusHandler implements ICommandHandler<UpdateApplicationStatusCommand> {
    async execute(command: UpdateApplicationStatusCommand): Promise<CreateApplicationResponse> {
        const entity = await ApplicationsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("application not found");

        entity.status = command.status;
        await ApplicationsEntity.save(entity);

        return plainToInstance(CreateApplicationResponse, entity, {excludeExtraneousValues: true});
    }
}
