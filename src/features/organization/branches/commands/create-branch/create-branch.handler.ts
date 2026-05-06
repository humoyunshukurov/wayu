import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {CountriesEntity} from "@/features/common/entities/countries.entity";
import {Representative} from "@/features/common/entities/representatives.entity";
import {CreateBranchCommand} from "./create-branch.command";
import {CreateBranchResponse} from "./create-branch.response";

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
    async execute(command: CreateBranchCommand): Promise<CreateBranchResponse> {
        const countryExists = await CountriesEntity.existsBy({id: command.countryId});
        if (!countryExists) throw new BadRequestException("country not found");

        const representativeExists = await Representative.existsBy({id: command.representativeId});
        if (!representativeExists) throw new BadRequestException("representative not found");

        const entity = BranchesEntity.create({
            countryId: command.countryId,
            representativeId: command.representativeId,
            city: command.city,
            latitude: command.latitude,
            longitude: command.longitude,
            phoneNumber: command.phoneNumber,
        } as BranchesEntity);
        await BranchesEntity.save(entity);

        return plainToInstance(CreateBranchResponse, entity, {excludeExtraneousValues: true});
    }
}
