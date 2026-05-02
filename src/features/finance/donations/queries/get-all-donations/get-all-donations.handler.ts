import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {DonationsEntity} from "@/features/common/entities/donations.entity";
import {GetAllDonationsQuery} from "./get-all-donations.query";
import {GetAllDonationsResponse} from "./get-all-donations.response";

@QueryHandler(GetAllDonationsQuery)
export class GetAllDonationsHandler implements IQueryHandler<GetAllDonationsQuery> {
    async execute(query: GetAllDonationsQuery): Promise<GetAllDonationsResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await DonationsEntity.find({skip, take, order: {date: "DESC"}});
        return plainToInstance(GetAllDonationsResponse, list, {excludeExtraneousValues: true});
    }
}
