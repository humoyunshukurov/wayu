import {vacancyType} from "@/core/enums/enums";

export class UpdateVacancyCommand {
    id!: number;
    title!: string;
    address!: string;
    description!: string;
    type!: vacancyType;
    salary!: string;
    isActive!: boolean;
}
