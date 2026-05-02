import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {DeleteBranchCommand} from "./delete-branch.command";

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchCommand> {
    async execute(command: DeleteBranchCommand): Promise<void> {
        const entity = await BranchesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("branch not found");
        await BranchesEntity.remove(entity);
    }
}
