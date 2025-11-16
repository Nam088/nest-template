import { HttpStatus } from '@nestjs/common';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            const result = appController.getHello();

            expect(result.data).toBe('Hello World!');
            expect(result.message).toBe('Hello message retrieved successfully');
            expect(result.statusCode).toBe(HttpStatus.OK);
        });
    });
});
