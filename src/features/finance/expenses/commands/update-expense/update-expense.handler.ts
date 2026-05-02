import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ExpensesEntity} from "@/features/common/entities/expenses.entity";
import {CreateExpenseResponse} from "@/features/finance/expenses/commands/create-expense/create-expense.response";
import {UpdateExpenseCommand} from "./update-expense.command";

@CommandHandler(UpdateExpenseCommand)
export class UpdateExpenseHandler implements ICommandHandler<UpdateExpenseCommand> {
    async execute(command: UpdateExpenseCommand): Promise<CreateExpenseResponse> {
        const entity = await ExpensesEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("expense not found");

        entity.amount = command.amount;
        entity.date = command.date;
        entity.title = command.title;
        entity.description = command.description;
        await ExpensesEntity.save(entity);

        return plainToInstance(CreateExpenseResponse, entity, {excludeExtraneousValues: true});
    }
}
