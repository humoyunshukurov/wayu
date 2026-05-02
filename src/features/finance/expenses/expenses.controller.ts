import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateExpenseRequest} from "./commands/create-expense/create-expense.request";
import {CreateExpenseResponse} from "./commands/create-expense/create-expense.response";
import {UpdateExpenseCommand} from "./commands/update-expense/update-expense.command";
import {UpdateExpenseRequest} from "./commands/update-expense/update-expense.request";
import {DeleteExpenseCommand} from "./commands/delete-expense/delete-expense.command";
import {GetAllExpensesFilters} from "./queries/get-all-expenses/get-all-expenses.filters";
import {GetAllExpensesQuery} from "./queries/get-all-expenses/get-all-expenses.query";
import {GetAllExpensesResponse} from "./queries/get-all-expenses/get-all-expenses.response";
import {GetExpenseByIdQuery} from "./queries/get-expense-by-id/get-expense-by-id.query";

@Controller('admin/expenses')
export class ExpensesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllExpensesResponse]})
    async getAll(@Query() filters: GetAllExpensesFilters) {
        return await this.queryBus.execute(new GetAllExpensesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateExpenseResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetExpenseByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateExpenseResponse})
    async create(@Body() req: CreateExpenseRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateExpenseResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateExpenseRequest) {
        const cmd = new UpdateExpenseCommand();
        cmd.id = id;
        cmd.amount = req.amount;
        cmd.date = new Date(req.date);
        cmd.title = req.title;
        cmd.description = req.description;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteExpenseCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
