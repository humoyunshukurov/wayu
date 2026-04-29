import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777468800587 implements MigrationInterface {
    name = 'Wayu1777468800587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_categories" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_3b52b497ae78df865c6769dc719" UNIQUE ("title"), CONSTRAINT "PK_20eed6c3ae534e7721fa44874a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "representatives" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "fullName" character varying(64) NOT NULL, "image" character varying(128) NOT NULL, "email" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "resume" text NOT NULL, CONSTRAINT "PK_80e9af53802d5e0376d1ae8f68c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "countryId" integer NOT NULL, "representativesId" integer NOT NULL, "city" character varying(64) NOT NULL, "latitude" numeric(10,7) NOT NULL, "phoneNumber" numeric(10,7) NOT NULL, "representativeId" integer, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "socialLinks" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(64) NOT NULL, "flag" character varying(128) NOT NULL, CONSTRAINT "UQ_9d485d0ac39862b621931252bad" UNIQUE ("title"), CONSTRAINT "PK_d966ef58ae57028444f2b596384" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "categoryId" integer NOT NULL, "countryId" integer NOT NULL, "title" character varying(256) NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('active', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64) NOT NULL, "vacancyId" integer NOT NULL, "resume" character varying(128) NOT NULL, "status" "public"."applications_status_enum" NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vacancies_type_enum" AS ENUM('fullTime', 'partTime')`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(256) NOT NULL, "address" character varying(128) NOT NULL, "description" text NOT NULL, "type" "public"."vacancies_type_enum" NOT NULL, "salary" character varying(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "socilaLinks" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(128) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_f5f736d95a943486ca297190a08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "question" character varying(256) NOT NULL, "answer" character varying(512) NOT NULL, CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqsTags" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "faqsId" integer NOT NULL, "tagId" integer NOT NULL, "faqId" integer, CONSTRAINT "PK_29fc5c50b4da5c14e329739c9c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_25cae3ff755adc0abe5ca284092" UNIQUE ("title"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staticInfo" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "appStoreLink" character varying(128), "playMarketLink" character varying(128), "aboutUs" text NOT NULL, CONSTRAINT "PK_49418aee1c05b46f78ef29743b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."questions_status_enum" AS ENUM('pending', 'answered', 'repeated', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "question" character varying(2000) NOT NULL, "status" "public"."questions_status_enum" NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsTags" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "newsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_6ee1951e12e570449bd176b8c8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instagramPosts" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "image" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_bc93d216703a2fda21cbeca015b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "amount" numeric(12,2) NOT NULL, "date" TIMESTAMP NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "transactionId" character varying(64) NOT NULL, CONSTRAINT "UQ_f1728b7ae26a61b0e695217ff16" UNIQUE ("transactionId"), CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "categoryId" integer NOT NULL, "title" character varying(256) NOT NULL, "content" text NOT NULL, "image" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "address" character varying(128) NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eventCategories" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_c17efc871363c93c1d58d80c5c1" UNIQUE ("title"), CONSTRAINT "PK_1de85e97ee1c07705ea34cdd0c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "amount" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "fullName" character varying(64) NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookCategories" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_2556e7db3ce3525a0104f73e94b" UNIQUE ("title"), CONSTRAINT "PK_ea689f47d8e96f5545bcdb411b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP DEFAULT now(), "authorId" integer NOT NULL, "categoryId" integer NOT NULL, "title" character varying(265) NOT NULL, "image" character varying(128) NOT NULL, "description" text, "file" character varying(256) NOT NULL, "pages" integer NOT NULL, "year" integer NOT NULL, "CategoryId" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP COLUMN "flag"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD "flag" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD "icon" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD "link" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP CONSTRAINT "UQ_9d485d0ac39862b621931252bad"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD "title" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_ec93cf21dec41ec5ca617512ef0" FOREIGN KEY ("countryId") REFERENCES "socialLinks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_11c91735b88837592a524662e69" FOREIGN KEY ("representativeId") REFERENCES "representatives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "socialLinks"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_5707a4abd8063c6494064d22d05" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD CONSTRAINT "FK_e2cf5c889cd3b8a101066ddbffd" FOREIGN KEY ("faqId") REFERENCES "faqs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD CONSTRAINT "FK_a91e2b80338307840e51d8522bc" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_2f7107d3528147b9237b6e2a2fe" FOREIGN KEY ("categoryId") REFERENCES "eventCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_33e8a33d8020000baa108b3ddec" FOREIGN KEY ("CategoryId") REFERENCES "bookCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_33e8a33d8020000baa108b3ddec"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_2f7107d3528147b9237b6e2a2fe"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP CONSTRAINT "FK_a91e2b80338307840e51d8522bc"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP CONSTRAINT "FK_e2cf5c889cd3b8a101066ddbffd"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_5707a4abd8063c6494064d22d05"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_11c91735b88837592a524662e69"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_ec93cf21dec41ec5ca617512ef0"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD "title" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD CONSTRAINT "UQ_9d485d0ac39862b621931252bad" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" DROP COLUMN "flag"`);
        await queryRunner.query(`ALTER TABLE "socialLinks" ADD "flag" character varying(128) NOT NULL`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "bookCategories"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TABLE "eventCategories"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "instagramPosts"`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`DROP TABLE "newsTags"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."questions_status_enum"`);
        await queryRunner.query(`DROP TABLE "staticInfo"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "faqsTags"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "socilaLinks"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TYPE "public"."vacancies_type_enum"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "socialLinks"`);
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TABLE "representatives"`);
        await queryRunner.query(`DROP TABLE "news_categories"`);
    }

}
