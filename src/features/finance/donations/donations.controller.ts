import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateDonationRequest} from "./commands/create-donation/create-donation.request";
import {CreateDonationResponse} from "./commands/create-donation/create-donation.response";
import {GetAllDonationsFilters} from "./queries/get-all-donations/get-all-donations.filters";
import {GetAllDonationsQuery} from "./queries/get-all-donations/get-all-donations.query";
import {GetAllDonationsResponse} from "./queries/get-all-donations/get-all-donations.response";
import {GetDonationByIdQuery} from "./queries/get-donation-by-id/get-donation-by-id.query";

@Controller('admin/donations')
export class DonationsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllDonationsResponse]})
    async getAll(@Query() filters: GetAllDonationsFilters) {
        return await this.queryBus.execute(new GetAllDonationsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateDonationResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetDonationByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateDonationResponse})
    async create(@Body() req: CreateDonationRequest) {
        return await this.commandBus.execute(req.toCommand());
    }
}
