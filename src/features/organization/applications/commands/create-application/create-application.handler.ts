import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ApplicationsEntity} from "@/features/common/entities/applications.entity";
import {VacanciesEntity} from "@/features/common/entities/vacancies.entity";
import {applicationStatus} from "@/core/enums/enums";
import {CreateApplicationCommand} from "./create-application.command";
import {CreateApplicationResponse} from "./create-application.response";

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
    async execute(command: CreateApplicationCommand): Promise<CreateApplicationResponse> {
        const vacancyExists = await VacanciesEntity.existsBy({id: command.vacancyId, isActive: true});
        if (!vacancyExists) throw new BadRequestException("vacancy not found or not active");

        const entity = ApplicationsEntity.create({
            fullName: command.fullName,
            phoneNumber: command.phoneNumber,
            email: command.email,
            vacancyId: command.vacancyId,
            resume: command.resume,
            status: applicationStatus.active,
        } as ApplicationsEntity);
        await ApplicationsEntity.save(entity);

        return plainToInstance(CreateApplicationResponse, entity, {excludeExtraneousValues: true});
    }
}
