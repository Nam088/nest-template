import 'reflect-metadata';

import type { NestApplication } from '@nestjs/core';
import { NestFactory, Reflector } from '@nestjs/core';

import { ClassSerializerInterceptor, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { HttpExceptionFilter, setUpSwagger } from '@nam088/nestjs-kit';

import { AppModule } from '@/app.module';

const bootstrap = async () => {
    const app = await NestFactory.create<NestApplication>(AppModule);
    const configService = app.get(ConfigService);
    const config = {
        apiVersion: configService.get<string>('apiVersion'),
        environment: configService.get<string>('environment'),
        port: configService.get<number>('port'),
        swagger: {
            title: configService.get<string>('swagger.title'),
            description: configService.get<string>('swagger.description'),
            version: configService.get<string>('swagger.version'),
        },
    };
    const reflector = app.get(Reflector);
    const logger = new Logger('Bootstrap');

    // Global class serializer interceptor
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    // Global exception filter
    app.useGlobalFilters(
        new HttpExceptionFilter(reflector, {
            customErrorMessages: {
                404: 'The resource you are looking for does not exist',
                500: 'Something went wrong on our end',
            },
            enableMetrics: true,
            enableRateLimitTracking: true,
            enableSanitization: true,
            isDevelopment: config.environment === 'development',
        }),
    );

    // Swagger configuration
    setUpSwagger(app, {
        title: config.swagger.title,
        apiKey: {
            providers: [
                {
                    name: 'api-key',
                    description: 'API Key for service authentication',
                    in: 'header',
                    keyName: 'X-API-Key',
                },
            ],
        },
        description: config.swagger.description,
        jwt: {
            providers: [
                {
                    name: 'access-token',
                    bearerFormat: 'JWT',
                    description: 'JWT access token',
                },
                {
                    name: 'refresh-token',
                    bearerFormat: 'JWT',
                    description: 'JWT refresh token',
                },
            ],
        },
        nodeEnv: config.environment,
        port: config.port,
        servers: [
            {
                description: 'Local Development',
                url: `http://localhost:${config.port}`,
            },
        ],
        version: config.swagger.version,
    });

    await app.listen(config.port);
    logger.log(`Application is running on: http://localhost:${config.port}`);
    logger.log(`Swagger documentation: http://localhost:${config.port}/docs`);
};

void bootstrap();
