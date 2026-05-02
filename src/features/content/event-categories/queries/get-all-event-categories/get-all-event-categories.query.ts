import {GetAllEventCategoriesFilters} from "./get-all-event-categories.filters";

export class GetAllEventCategoriesQuery {
    constructor(public readonly filters: GetAllEventCategoriesFilters) {}
}
