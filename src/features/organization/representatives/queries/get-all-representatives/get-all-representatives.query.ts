import {GetAllRepresentativesFilters} from "./get-all-representatives.filters";

export class GetAllRepresentativesQuery {
    constructor(public readonly filters: GetAllRepresentativesFilters) {}
}
