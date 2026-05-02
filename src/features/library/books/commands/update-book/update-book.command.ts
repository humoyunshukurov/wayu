export class UpdateBookCommand {
    id!: number;
    authorId!: number;
    categoryId!: number;
    title!: string;
    image!: string;
    description?: string;
    file!: string;
    pages!: number;
    year!: number;
}
