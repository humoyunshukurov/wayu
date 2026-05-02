import {GetAllNewsFilters} from "./get-all-news.filters";

export class GetAllNewsQuery {
    constructor(public readonly filters: GetAllNewsFilters) {}
}
