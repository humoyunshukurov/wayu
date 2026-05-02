import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {ExpensesEntity} from "@/features/common/entities/expenses.entity";
import {GetAllExpensesQuery} from "./get-all-expenses.query";
import {GetAllExpensesResponse} from "./get-all-expenses.response";

@QueryHandler(GetAllExpensesQuery)
export class GetAllExpensesHandler implements IQueryHandler<GetAllExpensesQuery> {
    async execute(query: GetAllExpensesQuery): Promise<GetAllExpensesResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await ExpensesEntity.find({skip, take, order: {date: "DESC"}});
        return plainToInstance(GetAllExpensesResponse, list, {excludeExtraneousValues: true});
    }
}
