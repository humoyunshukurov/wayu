import {vacancyType} from "@/core/enums/enums";

export class CreateVacancyCommand {
    title!: string;
    address!: string;
    description!: string;
    type!: vacancyType;
    salary!: string;
    isActive!: boolean;
}
