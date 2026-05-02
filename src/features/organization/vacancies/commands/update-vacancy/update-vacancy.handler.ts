import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {VacanciesEntity} from "@/features/common/entities/vacancies.entity";
import {CreateVacancyResponse} from "@/features/organization/vacancies/commands/create-vacancy/create-vacancy.response";
import {UpdateVacancyCommand} from "./update-vacancy.command";

@CommandHandler(UpdateVacancyCommand)
export class UpdateVacancyHandler implements ICommandHandler<UpdateVacancyCommand> {
    async execute(command: UpdateVacancyCommand): Promise<CreateVacancyResponse> {
        const entity = await VacanciesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("vacancy not found");

        entity.title = command.title;
        entity.address = command.address;
        entity.description = command.description;
        entity.type = command.type;
        entity.salary = command.salary;
        entity.isActive = command.isActive;
        await VacanciesEntity.save(entity);

        return plainToInstance(CreateVacancyResponse, entity, {excludeExtraneousValues: true});
    }
}
