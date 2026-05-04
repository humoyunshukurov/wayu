import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {InstagramPostsController} from "./instagram-posts/instagram-posts.controller";
import {CreateInstagramPostHandler} from "./instagram-posts/commands/create-instagram-post/create-instagram-post.handler";
import {UpdateInstagramPostHandler} from "./instagram-posts/commands/update-instagram-post/update-instagram-post.handler";
import {DeleteInstagramPostHandler} from "./instagram-posts/commands/delete-instagram-post/delete-instagram-post.handler";
import {GetAllInstagramPostsHandler} from "./instagram-posts/queries/get-all-instagram-posts/get-all-instagram-posts.handler";
import {GetInstagramPostByIdHandler} from "./instagram-posts/queries/get-instagram-post-by-id/get-instagram-post-by-id.handler";
import {SocialLinksController} from "./social-links/social-links.controller";
import {CreateSocialLinkHandler} from "./social-links/commands/create-social-link/create-social-link.handler";
import {UpdateSocialLinkHandler} from "./social-links/commands/update-social-link/update-social-link.handler";
import {DeleteSocialLinkHandler} from "./social-links/commands/delete-social-link/delete-social-link.handler";
import {GetAllSocialLinksHandler} from "./social-links/queries/get-all-social-links/get-all-social-links.handler";
import {GetSocialLinkByIdHandler} from "./social-links/queries/get-social-link-by-id/get-social-link-by-id.handler";
import {UsefulLinksController} from "./useful-links/useful-links.controller";
import {CreateUsefulLinkHandler} from "./useful-links/commands/create-useful-link/create-useful-link.handler";
import {UpdateUsefulLinkHandler} from "./useful-links/commands/update-useful-link/update-useful-link.handler";
import {DeleteUsefulLinkHandler} from "./useful-links/commands/delete-useful-link/delete-useful-link.handler";
import {GetAllUsefulLinksHandler} from "./useful-links/queries/get-all-useful-links/get-all-useful-links.handler";
import {GetUsefulLinkByIdHandler} from "./useful-links/queries/get-useful-link-by-id/get-useful-link-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [InstagramPostsController, SocialLinksController, UsefulLinksController],
    providers: [
        CreateInstagramPostHandler,
        UpdateInstagramPostHandler,
        DeleteInstagramPostHandler,
        GetAllInstagramPostsHandler,
        GetInstagramPostByIdHandler,
        CreateSocialLinkHandler,
        UpdateSocialLinkHandler,
        DeleteSocialLinkHandler,
        GetAllSocialLinksHandler,
        GetSocialLinkByIdHandler,
        CreateUsefulLinkHandler,
        UpdateUsefulLinkHandler,
        DeleteUsefulLinkHandler,
        GetAllUsefulLinksHandler,
        GetUsefulLinkByIdHandler,
    ],
})
export class SocialModule {}
