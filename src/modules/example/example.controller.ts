import { Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import {
    ApiDeleteEndpoint,
    ApiGetEndpoint,
    ApiPatchEndpoint,
    ApiPostEndpoint,
    ApiResponseData,
    ZodBody,
    ZodQuery,
} from '@nam088/nestjs-kit';

import { ExampleService } from '@/modules/example/example.service';

import {
    CreateExampleDto,
    createExampleSchema,
    ExampleListResponseDto,
    ExampleQueryDto,
    exampleQuerySchema,
    ExampleResponseDto,
    UpdateExampleDto,
    updateExampleSchema,
} from './dto';

@Controller('examples')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    @ApiPostEndpoint({
        apiUrl: '@POST /api/v1/examples',
        body: { type: CreateExampleDto, required: true },
        description: 'Create a new example',
        includeCommonErrors: true,
        response: ExampleResponseDto,
        summary: 'Create example',
        tags: ['Examples'],
    })
    @Post('/api/v1')
    /**
     * Creates a new example
     * @param {CreateExampleDto} createExampleDto - The data transfer object containing example creation data
     * @returns {ApiResponseData<ExampleResponseDto>} API response containing the created example
     */
    create(@ZodBody(createExampleSchema) createExampleDto: CreateExampleDto) {
        const example = this.exampleService.create(createExampleDto);

        return new ApiResponseData({
            data: example,
            message: 'Example created successfully',
            statusCode: HttpStatus.CREATED,
        });
    }

    @ApiGetEndpoint({
        apiUrl: '@GET /api/v1/examples',
        description: 'Get all examples with optional filtering and pagination',
        includeCommonErrors: true,
        response: ExampleListResponseDto,
        summary: 'Get all examples',
        tags: ['Examples'],
    })
    @Get('/api/v1')
    /**
     * Retrieves all examples with optional filtering, sorting, and pagination
     * @param {ExampleQueryDto} query - Query parameters for filtering, sorting, and pagination
     * @returns {ApiResponseData<ExampleListResponseDto>} API response containing paginated list of examples
     */
    findAll(@ZodQuery(exampleQuerySchema) query: ExampleQueryDto) {
        const results = this.exampleService.findAll({
            search: query.search,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        });

        // Simple pagination
        const { page } = query;
        const { limit } = query;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedResults = results.slice(startIndex, endIndex);

        return new ApiResponseData({
            data: {
                items: paginatedResults,
                pagination: {
                    limit,
                    page,
                    total: results.length,
                    totalPages: Math.ceil(results.length / limit),
                },
            },
            message: 'Examples retrieved successfully',
            statusCode: HttpStatus.OK,
        });
    }

    @ApiGetEndpoint({
        apiUrl: '@GET /api/v1/examples/:id',
        description: 'Get a single example by ID',
        includeCommonErrors: true,
        response: ExampleResponseDto,
        summary: 'Get example by ID',
        tags: ['Examples'],
    })
    @Get('/api/v1/:id')
    /**
     * Retrieves a single example by its ID
     * @param {string} id - The unique identifier of the example
     * @returns {ApiResponseData<ExampleResponseDto>} API response containing the example
     */
    findOne(@Param('id') id: string) {
        const example = this.exampleService.findOne(id);

        return new ApiResponseData({
            data: example,
            message: 'Example retrieved successfully',
            statusCode: HttpStatus.OK,
        });
    }

    @ApiPatchEndpoint({
        apiUrl: '@PATCH /api/v1/examples/:id',
        body: { type: UpdateExampleDto, required: true },
        description: 'Update an existing example',
        includeCommonErrors: true,
        response: ExampleResponseDto,
        summary: 'Update example',
        tags: ['Examples'],
    })
    @Patch('/api/v1/:id')
    /**
     * Updates an existing example
     * @param {string} id - The unique identifier of the example to update
     * @param {UpdateExampleDto} updateExampleDto - The data transfer object containing fields to update
     * @returns {ApiResponseData<ExampleResponseDto>} API response containing the updated example
     */
    update(@Param('id') id: string, @ZodBody(updateExampleSchema) updateExampleDto: UpdateExampleDto) {
        const example = this.exampleService.update(id, updateExampleDto);

        return new ApiResponseData({
            data: example,
            message: 'Example updated successfully',
            statusCode: HttpStatus.OK,
        });
    }

    @ApiDeleteEndpoint({
        apiUrl: '@DELETE /api/v1/examples/:id',
        description: 'Delete an example by ID',
        includeCommonErrors: true,
        summary: 'Delete example',
        tags: ['Examples'],
    })
    @Delete('/api/v1/:id')
    /**
     * Deletes an example by its ID
     * @param {string} id - The unique identifier of the example to delete
     * @returns {ApiResponseData<DeleteExampleResponseDto>} API response containing deletion confirmation
     */
    remove(@Param('id') id: string) {
        const result = this.exampleService.remove(id);

        return new ApiResponseData({
            data: result,
            message: 'Example deleted successfully',
            statusCode: HttpStatus.OK,
        });
    }
}
