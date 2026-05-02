import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {GetAllBranchesQuery} from "./get-all-branches.query";
import {GetAllBranchesResponse} from "./get-all-branches.response";

@QueryHandler(GetAllBranchesQuery)
export class GetAllBranchesHandler implements IQueryHandler<GetAllBranchesQuery> {
    async execute(query: GetAllBranchesQuery): Promise<GetAllBranchesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await BranchesEntity.find({skip, take});
        return plainToInstance(GetAllBranchesResponse, list, {excludeExtraneousValues: true});
    }
}
