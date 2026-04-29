import {Module} from "@nestjs/common";
import {NewsCategoryController} from "@/features/news/news-category/news-category.controller";
import {CreateNewsCategoryHandler} from "@/features/news/news-category/commends/create-news-category.handler";
import {GetAllNewsCategoriesHandler} from "@/features/news/news-category/queries/get-all-news-categories.handler";


@Module({
    controllers: [
        NewsCategoryController,
    ],
    providers: [
        GetAllNewsCategoriesHandler,
        CreateNewsCategoryHandler,




    ]
})
export class NewsModule {
}