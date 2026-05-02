import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateApplicationRequest} from "./commands/create-application/create-application.request";
import {CreateApplicationResponse} from "./commands/create-application/create-application.response";
import {UpdateApplicationStatusCommand} from "./commands/update-application-status/update-application-status.command";
import {UpdateApplicationStatusRequest} from "./commands/update-application-status/update-application-status.request";
import {GetAllApplicationsFilters} from "./queries/get-all-applications/get-all-applications.filters";
import {GetAllApplicationsQuery} from "./queries/get-all-applications/get-all-applications.query";
import {GetAllApplicationsResponse} from "./queries/get-all-applications/get-all-applications.response";
import {GetApplicationByIdQuery} from "./queries/get-application-by-id/get-application-by-id.query";

@Controller('admin/applications')
export class ApplicationsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllApplicationsResponse]})
    async getAll(@Query() filters: GetAllApplicationsFilters) {
        return await this.queryBus.execute(new GetAllApplicationsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateApplicationResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetApplicationByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateApplicationResponse})
    async create(@Body() req: CreateApplicationRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id/status')
    @ApiOkResponse({type: CreateApplicationResponse})
    async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateApplicationStatusRequest) {
        const cmd = new UpdateApplicationStatusCommand();
        cmd.id = id;
        cmd.status = req.status;
        return await this.commandBus.execute(cmd);
    }
}
