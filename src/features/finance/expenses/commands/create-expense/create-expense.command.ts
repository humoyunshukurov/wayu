export class CreateExpenseCommand {
    amount!: number;
    date!: Date;
    title!: string;
    description!: string;
    transactionId!: string;
}
