import {applicationStatus} from "@/core/enums/enums";

export class UpdateApplicationStatusCommand {
    id!: number;
    status!: applicationStatus;
}
