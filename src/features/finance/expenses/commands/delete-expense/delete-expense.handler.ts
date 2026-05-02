import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ExpensesEntity} from "@/features/common/entities/expenses.entity";
import {DeleteExpenseCommand} from "./delete-expense.command";

@CommandHandler(DeleteExpenseCommand)
export class DeleteExpenseHandler implements ICommandHandler<DeleteExpenseCommand> {
    async execute(command: DeleteExpenseCommand): Promise<void> {
        const entity = await ExpensesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("expense not found");
        await ExpensesEntity.remove(entity);
    }
}
