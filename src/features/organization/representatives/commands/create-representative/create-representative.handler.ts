import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Representative} from "@/features/common/entities/representatives.entity";
import {CreateRepresentativeCommand} from "./create-representative.command";
import {CreateRepresentativeResponse} from "./create-representative.response";

@CommandHandler(CreateRepresentativeCommand)
export class CreateRepresentativeHandler implements ICommandHandler<CreateRepresentativeCommand> {
    async execute(command: CreateRepresentativeCommand): Promise<CreateRepresentativeResponse> {
        const entity = Representative.create({
            fullName: command.fullName,
            image: command.image,
            email: command.email,
            phoneNumber: command.phoneNumber,
            resume: command.resume,
        } as Representative);
        await Representative.save(entity);

        return plainToInstance(CreateRepresentativeResponse, entity, {excludeExtraneousValues: true});
    }
}
