import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ExpensesEntity} from "@/features/common/entities/expenses.entity";
import {CreateExpenseResponse} from "@/features/finance/expenses/commands/create-expense/create-expense.response";
import {GetExpenseByIdQuery} from "./get-expense-by-id.query";

@QueryHandler(GetExpenseByIdQuery)
export class GetExpenseByIdHandler implements IQueryHandler<GetExpenseByIdQuery> {
    async execute(query: GetExpenseByIdQuery): Promise<CreateExpenseResponse> {
        const entity = await ExpensesEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("expense not found");
        return plainToInstance(CreateExpenseResponse, entity, {excludeExtraneousValues: true});
    }
}
