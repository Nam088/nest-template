import { z } from 'zod';

export const databaseConfigSchema = z.object({
    database: z.object({
        username: z.string().default('postgres'),
        database: z.string().default('nest_template'),
        host: z.string().default('localhost'),
        password: z.string().default('password'),
        port: z.coerce.number().int().positive().default(5432),
    }),
});

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;

export const databaseConfig = () => {
    const config = {
        database: {
            username: process.env.DB_USERNAME || 'postgres',
            database: process.env.DB_NAME || 'nest_template',
            host: process.env.DB_HOST || 'localhost',
            password: process.env.DB_PASSWORD || 'password',
            port: parseInt(process.env.DB_PORT || '5432', 10),
        },
    };

    return databaseConfigSchema.parse(config);
};
