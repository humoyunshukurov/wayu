import {GetAllDonationsFilters} from "./get-all-donations.filters";

export class GetAllDonationsQuery {
    constructor(public readonly filters: GetAllDonationsFilters) {}
}
