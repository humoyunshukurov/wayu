import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {SocialLinksEntity} from "@/features/common/entities/socialLinks.entity";
import {GetAllSocialLinksQuery} from "./get-all-social-links.query";
import {GetAllSocialLinksResponse} from "./get-all-social-links.response";

@QueryHandler(GetAllSocialLinksQuery)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksQuery> {
    async execute(): Promise<GetAllSocialLinksResponse[]> {
        const list = await SocialLinksEntity.find();
        return plainToInstance(GetAllSocialLinksResponse, list, {excludeExtraneousValues: true});
    }
}
