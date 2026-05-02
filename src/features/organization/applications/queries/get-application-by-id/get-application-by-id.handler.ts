import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ApplicationsEntity} from "@/features/common/entities/applications.entity";
import {CreateApplicationResponse} from "@/features/organization/applications/commands/create-application/create-application.response";
import {GetApplicationByIdQuery} from "./get-application-by-id.query";

@QueryHandler(GetApplicationByIdQuery)
export class GetApplicationByIdHandler implements IQueryHandler<GetApplicationByIdQuery> {
    async execute(query: GetApplicationByIdQuery): Promise<CreateApplicationResponse> {
        const entity = await ApplicationsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("application not found");
        return plainToInstance(CreateApplicationResponse, entity, {excludeExtraneousValues: true});
    }
}
