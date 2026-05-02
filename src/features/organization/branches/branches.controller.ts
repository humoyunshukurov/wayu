import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateBranchRequest} from "./commands/create-branch/create-branch.request";
import {CreateBranchResponse} from "./commands/create-branch/create-branch.response";
import {UpdateBranchCommand} from "./commands/update-branch/update-branch.command";
import {UpdateBranchRequest} from "./commands/update-branch/update-branch.request";
import {DeleteBranchCommand} from "./commands/delete-branch/delete-branch.command";
import {GetAllBranchesFilters} from "./queries/get-all-branches/get-all-branches.filters";
import {GetAllBranchesQuery} from "./queries/get-all-branches/get-all-branches.query";
import {GetAllBranchesResponse} from "./queries/get-all-branches/get-all-branches.response";
import {GetBranchByIdQuery} from "./queries/get-branch-by-id/get-branch-by-id.query";

@Controller('admin/branches')
export class BranchesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllBranchesResponse]})
    async getAll(@Query() filters: GetAllBranchesFilters) {
        return await this.queryBus.execute(new GetAllBranchesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateBranchResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetBranchByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateBranchResponse})
    async create(@Body() req: CreateBranchRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateBranchResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateBranchRequest) {
        const cmd = new UpdateBranchCommand();
        cmd.id = id;
        cmd.countryId = req.countryId;
        cmd.representativesId = req.representativesId;
        cmd.city = req.city;
        cmd.latitude = req.latitude;
        cmd.phoneNumber = req.phoneNumber;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteBranchCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
