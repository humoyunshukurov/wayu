import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ApplicationsEntity} from "@/features/common/entities/applications.entity";
import {GetAllApplicationsQuery} from "./get-all-applications.query";
import {GetAllApplicationsResponse} from "./get-all-applications.response";

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsQuery> {
    async execute(query: GetAllApplicationsQuery): Promise<GetAllApplicationsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await ApplicationsEntity.find({skip, take});
        return plainToInstance(GetAllApplicationsResponse, list, {excludeExtraneousValues: true});
    }
}
