import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {RepresentativesController} from "./representatives/representatives.controller";
import {CreateRepresentativeHandler} from "./representatives/commands/create-representative/create-representative.handler";
import {UpdateRepresentativeHandler} from "./representatives/commands/update-representative/update-representative.handler";
import {DeleteRepresentativeHandler} from "./representatives/commands/delete-representative/delete-representative.handler";
import {GetAllRepresentativesHandler} from "./representatives/queries/get-all-representatives/get-all-representatives.handler";
import {GetRepresentativeByIdHandler} from "./representatives/queries/get-representative-by-id/get-representative-by-id.handler";
import {BranchesController} from "./branches/branches.controller";
import {CreateBranchHandler} from "./branches/commands/create-branch/create-branch.handler";
import {UpdateBranchHandler} from "./branches/commands/update-branch/update-branch.handler";
import {DeleteBranchHandler} from "./branches/commands/delete-branch/delete-branch.handler";
import {GetAllBranchesHandler} from "./branches/queries/get-all-branches/get-all-branches.handler";
import {GetBranchByIdHandler} from "./branches/queries/get-branch-by-id/get-branch-by-id.handler";
import {VacanciesController} from "./vacancies/vacancies.controller";
import {CreateVacancyHandler} from "./vacancies/commands/create-vacancy/create-vacancy.handler";
import {UpdateVacancyHandler} from "./vacancies/commands/update-vacancy/update-vacancy.handler";
import {DeleteVacancyHandler} from "./vacancies/commands/delete-vacancy/delete-vacancy.handler";
import {GetAllVacanciesHandler} from "./vacancies/queries/get-all-vacancies/get-all-vacancies.handler";
import {GetVacancyByIdHandler} from "./vacancies/queries/get-vacancy-by-id/get-vacancy-by-id.handler";
import {ApplicationsController} from "./applications/applications.controller";
import {CreateApplicationHandler} from "./applications/commands/create-application/create-application.handler";
import {UpdateApplicationStatusHandler} from "./applications/commands/update-application-status/update-application-status.handler";
import {GetAllApplicationsHandler} from "./applications/queries/get-all-applications/get-all-applications.handler";
import {GetApplicationByIdHandler} from "./applications/queries/get-application-by-id/get-application-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [RepresentativesController, BranchesController, VacanciesController, ApplicationsController],
    providers: [
        CreateRepresentativeHandler,
        UpdateRepresentativeHandler,
        DeleteRepresentativeHandler,
        GetAllRepresentativesHandler,
        GetRepresentativeByIdHandler,
        CreateBranchHandler,
        UpdateBranchHandler,
        DeleteBranchHandler,
        GetAllBranchesHandler,
        GetBranchByIdHandler,
        CreateVacancyHandler,
        UpdateVacancyHandler,
        DeleteVacancyHandler,
        GetAllVacanciesHandler,
        GetVacancyByIdHandler,
        CreateApplicationHandler,
        UpdateApplicationStatusHandler,
        GetAllApplicationsHandler,
        GetApplicationByIdHandler,
    ],
})
export class OrganizationModule {}
