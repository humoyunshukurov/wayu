import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {DonationsEntity} from "@/features/common/entities/donations.entity";
import {CreateDonationResponse} from "@/features/finance/donations/commands/create-donation/create-donation.response";
import {GetDonationByIdQuery} from "./get-donation-by-id.query";

@QueryHandler(GetDonationByIdQuery)
export class GetDonationByIdHandler implements IQueryHandler<GetDonationByIdQuery> {
    async execute(query: GetDonationByIdQuery): Promise<CreateDonationResponse> {
        const entity = await DonationsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("donation not found");
        return plainToInstance(CreateDonationResponse, entity, {excludeExtraneousValues: true});
    }
}
