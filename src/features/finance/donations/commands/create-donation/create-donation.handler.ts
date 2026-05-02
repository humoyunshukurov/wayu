import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {DonationsEntity} from "@/features/common/entities/donations.entity";
import {CreateDonationCommand} from "./create-donation.command";
import {CreateDonationResponse} from "./create-donation.response";

@CommandHandler(CreateDonationCommand)
export class CreateDonationHandler implements ICommandHandler<CreateDonationCommand> {
    async execute(command: CreateDonationCommand): Promise<CreateDonationResponse> {
        const entity = DonationsEntity.create({
            amount: command.amount,
            date: command.date,
        } as DonationsEntity);
        await DonationsEntity.save(entity);

        return plainToInstance(CreateDonationResponse, entity, {excludeExtraneousValues: true});
    }
}
