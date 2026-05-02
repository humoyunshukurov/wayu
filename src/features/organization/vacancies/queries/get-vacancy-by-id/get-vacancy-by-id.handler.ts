import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {VacanciesEntity} from "@/features/common/entities/vacancies.entity";
import {CreateVacancyResponse} from "@/features/organization/vacancies/commands/create-vacancy/create-vacancy.response";
import {GetVacancyByIdQuery} from "./get-vacancy-by-id.query";

@QueryHandler(GetVacancyByIdQuery)
export class GetVacancyByIdHandler implements IQueryHandler<GetVacancyByIdQuery> {
    async execute(query: GetVacancyByIdQuery): Promise<CreateVacancyResponse> {
        const entity = await VacanciesEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("vacancy not found");
        return plainToInstance(CreateVacancyResponse, entity, {excludeExtraneousValues: true});
    }
}
