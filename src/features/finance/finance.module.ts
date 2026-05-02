import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {DonationsController} from "./donations/donations.controller";
import {CreateDonationHandler} from "./donations/commands/create-donation/create-donation.handler";
import {GetAllDonationsHandler} from "./donations/queries/get-all-donations/get-all-donations.handler";
import {GetDonationByIdHandler} from "./donations/queries/get-donation-by-id/get-donation-by-id.handler";
import {ExpensesController} from "./expenses/expenses.controller";
import {CreateExpenseHandler} from "./expenses/commands/create-expense/create-expense.handler";
import {UpdateExpenseHandler} from "./expenses/commands/update-expense/update-expense.handler";
import {DeleteExpenseHandler} from "./expenses/commands/delete-expense/delete-expense.handler";
import {GetAllExpensesHandler} from "./expenses/queries/get-all-expenses/get-all-expenses.handler";
import {GetExpenseByIdHandler} from "./expenses/queries/get-expense-by-id/get-expense-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [DonationsController, ExpensesController],
    providers: [
        CreateDonationHandler,
        GetAllDonationsHandler,
        GetDonationByIdHandler,
        CreateExpenseHandler,
        UpdateExpenseHandler,
        DeleteExpenseHandler,
        GetAllExpensesHandler,
        GetExpenseByIdHandler,
    ],
})
export class FinanceModule {}
