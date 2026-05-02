import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from "@/config/typeorm.config";
import {CqrsModule} from "@nestjs/cqrs";
import {NewsModule} from "@/features/news/news.module";
import {ContentModule} from "@/features/content/content.module";
import {LibraryModule} from "@/features/library/library.module";
import {OrganizationModule} from "@/features/organization/organization.module";
import {FinanceModule} from "@/features/finance/finance.module";
import {SocialModule} from "@/features/social/social.module";
import {SettingsModule} from "@/features/settings/settings.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    ContentModule,
    NewsModule,
    LibraryModule,
    OrganizationModule,
    FinanceModule,
    SocialModule,
    SettingsModule,
  ],
})
export class AppModule {}
