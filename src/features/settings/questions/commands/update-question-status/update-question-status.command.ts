import {questionStatus} from "@/core/enums/enums";

export class UpdateQuestionStatusCommand {
    id!: number;
    status!: questionStatus;
}
