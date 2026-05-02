import {GetAllApplicationsFilters} from "./get-all-applications.filters";

export class GetAllApplicationsQuery {
    constructor(public readonly filters: GetAllApplicationsFilters) {}
}
