import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {QuestionsEntity} from "@/features/common/entities/questions.entity";
import {GetAllQuestionsQuery} from "./get-all-questions.query";
import {GetQuestionByIdResponse} from "@/features/settings/questions/queries/get-question-by-id/get-question-by-id.response";

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsQuery> {
    async execute(query: GetAllQuestionsQuery): Promise<GetQuestionByIdResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const list = await QuestionsEntity.find({skip, take, order: {createdAt: "DESC"}});
        return plainToInstance(GetQuestionByIdResponse, list, {excludeExtraneousValues: true});
    }
}
