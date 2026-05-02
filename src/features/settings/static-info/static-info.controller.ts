import {Body, Controller, Get, Put} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiOkResponse} from "@nestjs/swagger";
import {UpdateStaticInfoCommand} from "./commands/update-static-info/update-static-info.command";
import {UpdateStaticInfoRequest} from "./commands/update-static-info/update-static-info.request";
import {UpdateStaticInfoResponse} from "./commands/update-static-info/update-static-info.response";
import {GetStaticInfoQuery} from "./queries/get-static-info/get-static-info.query";

@Controller('admin/static-info')
export class StaticInfoController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: UpdateStaticInfoResponse})
    async get() {
        return await this.queryBus.execute(new GetStaticInfoQuery());
    }

    @Put()
    @ApiOkResponse({type: UpdateStaticInfoResponse})
    async update(@Body() req: UpdateStaticInfoRequest) {
        const cmd = new UpdateStaticInfoCommand();
        cmd.appStoreLink = req.appStoreLink;
        cmd.playMarketLink = req.playMarketLink;
        cmd.aboutUs = req.aboutUs;
        return await this.commandBus.execute(cmd);
    }
}
