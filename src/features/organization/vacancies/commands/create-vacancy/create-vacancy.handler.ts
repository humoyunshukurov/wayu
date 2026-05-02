import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {VacanciesEntity} from "@/features/common/entities/vacancies.entity";
import {CreateVacancyCommand} from "./create-vacancy.command";
import {CreateVacancyResponse} from "./create-vacancy.response";

@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
    async execute(command: CreateVacancyCommand): Promise<CreateVacancyResponse> {
        const entity = VacanciesEntity.create({
            title: command.title,
            address: command.address,
            description: command.description,
            type: command.type,
            salary: command.salary,
            isActive: command.isActive,
        } as VacanciesEntity);
        await VacanciesEntity.save(entity);

        return plainToInstance(CreateVacancyResponse, entity, {excludeExtraneousValues: true});
    }
}
