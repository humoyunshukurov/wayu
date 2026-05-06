export class CreateNewsCommand {
    categoryId!: number;
    countryId!: number | null;
    title!: string;
    image!: string;
    date!: string;
    content!: string;
}
