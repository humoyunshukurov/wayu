import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from "@/config/typeorm.config";
import {NewsModule} from "@/features/news/news.module";
import {CqrsModule} from "@nestjs/cqrs";
import {ContentModule} from "@/features/content/content.module";


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    ContentModule,
    NewsModule
  ],
})
export class AppModule {
}