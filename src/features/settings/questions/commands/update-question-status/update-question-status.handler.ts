import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "@/features/common/entities/questions.entity";
import {UpdateQuestionStatusCommand} from "./update-question-status.command";
import {GetQuestionByIdResponse} from "@/features/settings/questions/queries/get-question-by-id/get-question-by-id.response";

@CommandHandler(UpdateQuestionStatusCommand)
export class UpdateQuestionStatusHandler implements ICommandHandler<UpdateQuestionStatusCommand> {
    async execute(command: UpdateQuestionStatusCommand): Promise<GetQuestionByIdResponse> {
        const entity = await QuestionsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("question not found");

        entity.status = command.status;
        await QuestionsEntity.save(entity);

        return plainToInstance(GetQuestionByIdResponse, entity, {excludeExtraneousValues: true});
    }
}
