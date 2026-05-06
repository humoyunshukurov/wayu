import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request = require('supertest');
import {createTestApp} from './utils/test-app';
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';
import * as argon2 from "argon2";


describe('BookCategoriesController (e2e)', () => {
    let app: INestApplication
    let dataSource: DataSource
    let jwtToken: string


    beforeAll(async ()=>{
        ({ app, dataSource }= await  createTestApp())
        let password=await argon2.hash('qwer')
        await dataSource.query(`INSERT INTO users ("fullname","login","loginType","isVerified","isActive","role",
                   "password")
                   VALUES ('Ali','ali@gmail.com','email',true, true, 'admin', '${password}')`)
    })


    afterAll(async () => await teardownTestApp(app, dataSource))

    it(
        'POST /admin/book-categories -> should return 201',
        async () => {
            const res = await request(app.getHttpServer())
                .post('/admin/book-categories')
                .send({title: 'Tarix'})
                .expect(201)

            expect(res.body.id).toEqual(1)
            expect(res.body.title).toEqual('Tarix')
        }
    )

    it(
        'POST /admin/book-categories -> should return 400 on duplicate title',
        async () => {
            await request(app.getHttpServer())
                .post('/admin/book-categories')
                .send({title: 'Tarix'})
                .expect(400)
        }
    )

    it(
        'POST/admin/book-categories -> should return 400 on duplicate title',
        async () => {
            await request(app.getHttpServer())
                .post('/admin/book-categories')
                .send({title: 'Tarix'})
                .expect(400)
        }
    )
})
