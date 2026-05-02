import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {NewsCategoryController} from "@/features/news/news-category/news-category.controller";
import {CreateNewsCategoryHandler} from "@/features/news/news-category/commends/create-news-category.handler";
import {UpdateNewsCategoryHandler} from "@/features/news/news-category/commends/update-news-category.handler";
import {DeleteNewsCategoryHandler} from "@/features/news/news-category/commends/delete-news-category.handler";
import {GetAllNewsCategoriesHandler} from "@/features/news/news-category/queries/get-all-news-categories.handler";
import {GetNewsCategoryByIdHandler} from "@/features/news/news-category/queries/get-news-category-by-id.handler";
import {NewsController} from "@/features/news/news/news.controller";
import {CreateNewsHandler} from "@/features/news/news/commands/create-news/create-news.handler";
import {UpdateNewsHandler} from "@/features/news/news/commands/update-news/update-news.handler";
import {DeleteNewsHandler} from "@/features/news/news/commands/delete-news/delete-news.handler";
import {GetAllNewsHandler} from "@/features/news/news/queries/get-all-news/get-all-news.handler";
import {GetNewsByIdHandler} from "@/features/news/news/queries/get-news-by-id/get-news-by-id.handler";

@Module({
    imports: [CqrsModule],
    controllers: [NewsCategoryController, NewsController],
    providers: [
        CreateNewsCategoryHandler,
        UpdateNewsCategoryHandler,
        DeleteNewsCategoryHandler,
        GetAllNewsCategoriesHandler,
        GetNewsCategoryByIdHandler,
        CreateNewsHandler,
        UpdateNewsHandler,
        DeleteNewsHandler,
        GetAllNewsHandler,
        GetNewsByIdHandler,
    ],
})
export class NewsModule {}
