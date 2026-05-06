import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {CountriesEntity} from "@/features/common/entities/countries.entity";
import {Representative} from "@/features/common/entities/representatives.entity";
import {CreateBranchResponse} from "@/features/organization/branches/commands/create-branch/create-branch.response";
import {UpdateBranchCommand} from "./update-branch.command";

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler implements ICommandHandler<UpdateBranchCommand> {
    async execute(command: UpdateBranchCommand): Promise<CreateBranchResponse> {
        const entity = await BranchesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("branch not found");

        const countryExists = await CountriesEntity.existsBy({id: command.countryId});
        if (!countryExists) throw new BadRequestException("country not found");

        const representativeExists = await Representative.existsBy({id: command.representativeId});
        if (!representativeExists) throw new BadRequestException("representative not found");

        entity.countryId = command.countryId;
        entity.representativeId = command.representativeId;
        entity.city = command.city;
        entity.latitude = command.latitude;
        entity.longitude = command.longitude;
        entity.phoneNumber = command.phoneNumber;
        await BranchesEntity.save(entity);

        return plainToInstance(CreateBranchResponse, entity, {excludeExtraneousValues: true});
    }
}
