import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateRepresentativeRequest} from "./commands/create-representative/create-representative.request";
import {CreateRepresentativeResponse} from "./commands/create-representative/create-representative.response";
import {UpdateRepresentativeCommand} from "./commands/update-representative/update-representative.command";
import {UpdateRepresentativeRequest} from "./commands/update-representative/update-representative.request";
import {DeleteRepresentativeCommand} from "./commands/delete-representative/delete-representative.command";
import {GetAllRepresentativesFilters} from "./queries/get-all-representatives/get-all-representatives.filters";
import {GetAllRepresentativesQuery} from "./queries/get-all-representatives/get-all-representatives.query";
import {GetAllRepresentativesResponse} from "./queries/get-all-representatives/get-all-representatives.response";
import {GetRepresentativeByIdQuery} from "./queries/get-representative-by-id/get-representative-by-id.query";

@Controller('admin/representatives')
export class RepresentativesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllRepresentativesResponse]})
    async getAll(@Query() filters: GetAllRepresentativesFilters) {
        return await this.queryBus.execute(new GetAllRepresentativesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateRepresentativeResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetRepresentativeByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateRepresentativeResponse})
    async create(@Body() req: CreateRepresentativeRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateRepresentativeResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateRepresentativeRequest) {
        const cmd = new UpdateRepresentativeCommand();
        cmd.id = id;
        cmd.fullName = req.fullName;
        cmd.image = req.image;
        cmd.email = req.email;
        cmd.phoneNumber = req.phoneNumber;
        cmd.resume = req.resume;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteRepresentativeCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
