import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

import {DeleteCountryCommand} from "./delete-country.command";
import {CountriesEntity} from "@/features/common/entities/countries.entity";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {NewsEntity} from "@/features/news/news/news.entity";

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
    async execute(command: DeleteCountryCommand): Promise<void> {
        const entity = await CountriesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("country not found");

        const hasNews = await NewsEntity.exists({where: {country: {id: command.id}}});
        const hasBranches = await BranchesEntity.exists({where: {country: {id: command.id}}});
        if (hasNews || hasBranches) throw new BadRequestException("country has attached data");

        await CountriesEntity.remove(entity);
    }
}