import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { appConfig, databaseConfig } from '@/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
            // Validation is handled by Zod schemas in the config files
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
