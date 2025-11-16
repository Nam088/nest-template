import { z } from 'zod';

export const appConfigSchema = z.object({
    apiVersion: z.string().default('v1'),
    environment: z.enum(['development', 'production', 'test']).default('development'),
    port: z.coerce.number().int().positive().default(3000),
    swagger: z.object({
        title: z.string().default('NestJS API'),
        description: z.string().default('REST API Documentation'),
        version: z.string().default('1.0.0'),
    }),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export const appConfig = () => {
    const config = {
        apiVersion: process.env.API_VERSION || 'v1',
        environment: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '3000', 10),
        swagger: {
            title: process.env.SWAGGER_TITLE || 'NestJS API',
            description: process.env.SWAGGER_DESCRIPTION || 'REST API Documentation',
            version: process.env.SWAGGER_VERSION || '1.0.0',
        },
    };

    return appConfigSchema.parse(config);
};
