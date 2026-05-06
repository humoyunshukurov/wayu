export class UpdateNewsCommand {
    id!: number;
    categoryId!: number;
    countryId!: number | null;
    title!: string;
    image?: string;
    date!: string;
    content!: string;
}
