import type { INestApplication } from '@nestjs/common';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from './../src/app.module';

import type { App } from 'supertest/types';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', async () => {
        const response: {
            body: {
                message: string;
            };
            status: number;
        } = (await request(app.getHttpServer()).get('/')) as {
            body: {
                message: string;
            };
            status: number;
        };

        expect(response.status).toBe(200);

        expect(response.body.message).toBe('Hello World!');
    });
});
