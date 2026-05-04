import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {UsefulLinksEntity} from "@/features/common/entities/usefulLinks.entity";
import {CreateUsefulLinkResponse} from "../../commands/create-useful-link/create-useful-link.response";
import {GetUsefulLinkByIdQuery} from "./get-useful-link-by-id.query";

@QueryHandler(GetUsefulLinkByIdQuery)
export class GetUsefulLinkByIdHandler implements IQueryHandler<GetUsefulLinkByIdQuery> {
    async execute(query: GetUsefulLinkByIdQuery): Promise<CreateUsefulLinkResponse> {
        const entity = await UsefulLinksEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("useful link not found");
        return plainToInstance(CreateUsefulLinkResponse, entity, {excludeExtraneousValues: true});
    }
}
