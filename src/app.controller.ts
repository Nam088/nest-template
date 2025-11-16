import { Controller, Get, HttpStatus } from '@nestjs/common';

import { ApiGetEndpoint, ApiResponseData } from '@nam088/nestjs-kit';

import { AppService } from '@/app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiGetEndpoint({
        apiUrl: '@GET /api/v1',
        description: 'Returns a simple hello message from the API',
        includeCommonErrors: true,
        response: String,
        summary: 'Get hello message',
        tags: ['Health'],
    })
    @Get()
    /**
     * Retrieves a hello message from the API
     * @returns {ApiResponseData<string>} API response containing the hello message
     */
    getHello() {
        const message = this.appService.getHello();

        return new ApiResponseData({
            data: message,
            message: 'Hello message retrieved successfully',
            statusCode: HttpStatus.OK,
        });
    }
}
