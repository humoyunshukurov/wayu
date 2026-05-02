import {GetAllAuthorsFilters} from "./get-all-authors.filters";

export class GetAllAuthorsQuery {
    constructor(public readonly filters: GetAllAuthorsFilters) {}
}
