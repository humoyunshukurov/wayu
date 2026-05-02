import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {UsefulLinksEntity} from "@/features/common/entities/usefulLinks.entity";
import {GetAllUsefulLinksQuery} from "./get-all-useful-links.query";
import {GetAllUsefulLinksResponse} from "./get-all-useful-links.response";

@QueryHandler(GetAllUsefulLinksQuery)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksQuery> {
    async execute(): Promise<GetAllUsefulLinksResponse[]> {
        const list = await UsefulLinksEntity.find();
        return plainToInstance(GetAllUsefulLinksResponse, list, {excludeExtraneousValues: true});
    }
}
