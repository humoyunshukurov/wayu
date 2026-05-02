import {Body, Controller, Get, Param, ParseIntPipe, Patch, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {UpdateQuestionStatusCommand} from "./commands/update-question-status/update-question-status.command";
import {UpdateQuestionStatusRequest} from "./commands/update-question-status/update-question-status.request";
import {GetAllQuestionsFilters} from "./queries/get-all-questions/get-all-questions.filters";
import {GetAllQuestionsQuery} from "./queries/get-all-questions/get-all-questions.query";
import {GetQuestionByIdQuery} from "./queries/get-question-by-id/get-question-by-id.query";
import {GetQuestionByIdResponse} from "./queries/get-question-by-id/get-question-by-id.response";

@Controller('admin/questions')
export class QuestionsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetQuestionByIdResponse]})
    async getAll(@Query() filters: GetAllQuestionsFilters) {
        return await this.queryBus.execute(new GetAllQuestionsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: GetQuestionByIdResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetQuestionByIdQuery(id));
    }

    @Patch(':id/status')
    @ApiOkResponse({type: GetQuestionByIdResponse})
    async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateQuestionStatusRequest) {
        const cmd = new UpdateQuestionStatusCommand();
        cmd.id = id;
        cmd.status = req.status;
        return await this.commandBus.execute(cmd);
    }
}
