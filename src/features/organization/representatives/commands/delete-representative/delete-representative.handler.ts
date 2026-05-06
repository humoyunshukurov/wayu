import {BadRequestException, NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Representative} from "@/features/common/entities/representatives.entity";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {DeleteRepresentativeCommand} from "./delete-representative.command";

@CommandHandler(DeleteRepresentativeCommand)
export class DeleteRepresentativeHandler implements ICommandHandler<DeleteRepresentativeCommand> {
    async execute(command: DeleteRepresentativeCommand): Promise<void> {
        const entity = await Representative.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("representative not found");

        const hasBranches = await BranchesEntity.existsBy({representativeId: command.id});
        if (hasBranches) throw new BadRequestException("representative has attached branches");

        await Representative.remove(entity);
    }
}
