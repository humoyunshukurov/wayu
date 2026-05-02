import {GetAllVacanciesFilters} from "./get-all-vacancies.filters";

export class GetAllVacanciesQuery {
    constructor(public readonly filters: GetAllVacanciesFilters) {}
}
