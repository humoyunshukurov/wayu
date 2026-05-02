import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Representative} from "@/features/common/entities/representatives.entity";
import {CreateRepresentativeResponse} from "@/features/organization/representatives/commands/create-representative/create-representative.response";
import {UpdateRepresentativeCommand} from "./update-representative.command";

@CommandHandler(UpdateRepresentativeCommand)
export class UpdateRepresentativeHandler implements ICommandHandler<UpdateRepresentativeCommand> {
    async execute(command: UpdateRepresentativeCommand): Promise<CreateRepresentativeResponse> {
        const entity = await Representative.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("representative not found");

        entity.fullName = command.fullName;
        entity.image = command.image;
        entity.email = command.email as string;
        entity.phoneNumber = command.phoneNumber;
        entity.resume = command.resume;
        await Representative.save(entity);

        return plainToInstance(CreateRepresentativeResponse, entity, {excludeExtraneousValues: true});
    }
}
