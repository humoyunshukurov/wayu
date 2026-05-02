import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {VacanciesEntity} from "@/features/common/entities/vacancies.entity";
import {ApplicationsEntity} from "@/features/common/entities/applications.entity";
import {DeleteVacancyCommand} from "./delete-vacancy.command";

@CommandHandler(DeleteVacancyCommand)
export class DeleteVacancyHandler implements ICommandHandler<DeleteVacancyCommand> {
    async execute(command: DeleteVacancyCommand): Promise<void> {
        const entity = await VacanciesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("vacancy not found");

        const hasApplications = await ApplicationsEntity.existsBy({vacancyId: command.id});
        if (hasApplications) throw new BadRequestException("vacancy has attached applications");

        await VacanciesEntity.remove(entity);
    }
}
