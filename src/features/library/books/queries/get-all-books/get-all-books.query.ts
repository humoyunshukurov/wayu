import {GetAllBooksFilters} from "./get-all-books.filters";

export class GetAllBooksQuery {
    constructor(public readonly filters: GetAllBooksFilters) {}
}
