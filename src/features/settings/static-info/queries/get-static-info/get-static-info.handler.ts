import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {StaticInfoEntity} from "@/features/common/entities/staticInfo.entity";
import {UpdateStaticInfoResponse} from "@/features/settings/static-info/commands/update-static-info/update-static-info.response";
import {GetStaticInfoQuery} from "./get-static-info.query";

@QueryHandler(GetStaticInfoQuery)
export class GetStaticInfoHandler implements IQueryHandler<GetStaticInfoQuery> {
    async execute(): Promise<UpdateStaticInfoResponse | null> {
        const entity = await StaticInfoEntity.findOne({where: {}});
        if (!entity) return null;
        return plainToInstance(UpdateStaticInfoResponse, entity, {excludeExtraneousValues: true});
    }
}
