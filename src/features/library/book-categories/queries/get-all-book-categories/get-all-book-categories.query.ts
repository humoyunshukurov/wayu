import {GetAllBookCategoriesFilters} from "./get-all-book-categories.filters";

export class GetAllBookCategoriesQuery {
    constructor(public readonly filters: GetAllBookCategoriesFilters) {}
}
