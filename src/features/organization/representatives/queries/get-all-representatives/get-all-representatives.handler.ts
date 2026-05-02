import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Representative} from "@/features/common/entities/representatives.entity";
import {GetAllRepresentativesQuery} from "./get-all-representatives.query";
import {GetAllRepresentativesResponse} from "./get-all-representatives.response";

@QueryHandler(GetAllRepresentativesQuery)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesQuery> {
    async execute(query: GetAllRepresentativesQuery): Promise<GetAllRepresentativesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await Representative.find({skip, take});
        return plainToInstance(GetAllRepresentativesResponse, list, {excludeExtraneousValues: true});
    }
}
