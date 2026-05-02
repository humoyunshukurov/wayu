import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {CreateBranchResponse} from "@/features/organization/branches/commands/create-branch/create-branch.response";
import {GetBranchByIdQuery} from "./get-branch-by-id.query";

@QueryHandler(GetBranchByIdQuery)
export class GetBranchByIdHandler implements IQueryHandler<GetBranchByIdQuery> {
    async execute(query: GetBranchByIdQuery): Promise<CreateBranchResponse> {
        const entity = await BranchesEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("branch not found");
        return plainToInstance(CreateBranchResponse, entity, {excludeExtraneousValues: true});
    }
}
