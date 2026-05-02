import {GetAllExpensesFilters} from "./get-all-expenses.filters";

export class GetAllExpensesQuery {
    constructor(public readonly filters: GetAllExpensesFilters) {}
}
