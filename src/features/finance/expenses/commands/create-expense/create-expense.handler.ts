import {BadRequestException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ExpensesEntity} from "@/features/common/entities/expenses.entity";
import {CreateExpenseCommand} from "./create-expense.command";
import {CreateExpenseResponse} from "./create-expense.response";

@CommandHandler(CreateExpenseCommand)
export class CreateExpenseHandler implements ICommandHandler<CreateExpenseCommand> {
    async execute(command: CreateExpenseCommand): Promise<CreateExpenseResponse> {
        const txExists = await ExpensesEntity.existsBy({transactionId: command.transactionId});
        if (txExists) throw new BadRequestException("transactionId is already used");

        const entity = ExpensesEntity.create({
            amount: command.amount,
            date: command.date,
            title: command.title,
            description: command.description,
            transactionId: command.transactionId,
        } as ExpensesEntity);
        await ExpensesEntity.save(entity);

        return plainToInstance(CreateExpenseResponse, entity, {excludeExtraneousValues: true});
    }
}
