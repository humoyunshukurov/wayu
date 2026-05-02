import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "@/features/common/entities/questions.entity";
import {GetQuestionByIdResponse} from "./get-question-by-id.response";
import {GetQuestionByIdQuery} from "./get-question-by-id.query";

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdHandler implements IQueryHandler<GetQuestionByIdQuery> {
    async execute(query: GetQuestionByIdQuery): Promise<GetQuestionByIdResponse> {
        const entity = await QuestionsEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("question not found");
        return plainToInstance(GetQuestionByIdResponse, entity, {excludeExtraneousValues: true});
    }
}
