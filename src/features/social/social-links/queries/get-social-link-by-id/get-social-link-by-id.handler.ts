import {NotFoundException} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {SocialLinksEntity} from "@/features/common/entities/socialLinks.entity";
import {CreateSocialLinkResponse} from "../../commands/create-social-link/create-social-link.response";
import {GetSocialLinkByIdQuery} from "./get-social-link-by-id.query";

@QueryHandler(GetSocialLinkByIdQuery)
export class GetSocialLinkByIdHandler implements IQueryHandler<GetSocialLinkByIdQuery> {
    async execute(query: GetSocialLinkByIdQuery): Promise<CreateSocialLinkResponse> {
        const entity = await SocialLinksEntity.findOneBy({id: query.id});
        if (!entity) throw new NotFoundException("social link not found");
        return plainToInstance(CreateSocialLinkResponse, entity, {excludeExtraneousValues: true});
    }
}
