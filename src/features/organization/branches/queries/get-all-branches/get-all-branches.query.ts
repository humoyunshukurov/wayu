import {GetAllBranchesFilters} from "./get-all-branches.filters";

export class GetAllBranchesQuery {
    constructor(public readonly filters: GetAllBranchesFilters) {}
}
