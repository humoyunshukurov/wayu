import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateVacancyRequest} from "./commands/create-vacancy/create-vacancy.request";
import {CreateVacancyResponse} from "./commands/create-vacancy/create-vacancy.response";
import {UpdateVacancyCommand} from "./commands/update-vacancy/update-vacancy.command";
import {UpdateVacancyRequest} from "./commands/update-vacancy/update-vacancy.request";
import {DeleteVacancyCommand} from "./commands/delete-vacancy/delete-vacancy.command";
import {GetAllVacanciesFilters} from "./queries/get-all-vacancies/get-all-vacancies.filters";
import {GetAllVacanciesQuery} from "./queries/get-all-vacancies/get-all-vacancies.query";
import {GetAllVacanciesResponse} from "./queries/get-all-vacancies/get-all-vacancies.response";
import {GetVacancyByIdQuery} from "./queries/get-vacancy-by-id/get-vacancy-by-id.query";

@Controller('admin/vacancies')
export class VacanciesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllVacanciesResponse]})
    async getAll(@Query() filters: GetAllVacanciesFilters) {
        return await this.queryBus.execute(new GetAllVacanciesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateVacancyResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetVacancyByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateVacancyResponse})
    async create(@Body() req: CreateVacancyRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateVacancyResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateVacancyRequest) {
        const cmd = new UpdateVacancyCommand();
        cmd.id = id;
        cmd.title = req.title;
        cmd.address = req.address;
        cmd.description = req.description;
        cmd.type = req.type;
        cmd.salary = req.salary;
        cmd.isActive = req.isActive;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteVacancyCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
