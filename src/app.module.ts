import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from "@/config/typeorm.config";

import {NewsModule} from "@/featuress/news/news.module";
import {CqrsModule} from "@nestjs/cqrs";


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    NewsModule
  ],
})
export class AppModule {
}