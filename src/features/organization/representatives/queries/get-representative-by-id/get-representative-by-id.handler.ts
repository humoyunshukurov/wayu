import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {Representative} from "@/features/common/entities/representatives.entity";
import {CreateRepresentativeResponse} from "@/features/organization/representatives/commands/create-representative/create-representative.response";
import {GetRepresentativeByIdQuery} from "./get-representative-by-id.query";

@QueryHandler(GetRepresentativeByIdQuery)
export class GetRepresentativeByIdHandler implements IQueryHandler<GetRepresentativeByIdQuery> {
    async execute(query: GetRepresentativeByIdQuery): Promise<CreateRepresentativeResponse> {
        const entity = await Representative.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("representative not found");
        return plainToInstance(CreateRepresentativeResponse, entity, {excludeExtraneousValues: true});
    }
}
