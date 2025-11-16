import { ApiPropertyOptional } from '@nestjs/swagger';

import { z } from 'zod';

export const exampleQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    page: z.coerce.number().int().positive().optional().default(1),
    search: z.string().optional(),
    sortBy: z.enum(['name', 'createdAt']).optional().default('name'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type ExampleQueryDtoType = z.infer<typeof exampleQuerySchema>;

export class ExampleQueryDto implements ExampleQueryDtoType {
    @ApiPropertyOptional({
        type: Number,
        description: 'Number of items per page',
        example: 10,
        maximum: 100,
        minimum: 1,
    })
    limit!: number;

    @ApiPropertyOptional({
        type: Number,
        description: 'Page number',
        example: 1,
        minimum: 1,
    })
    page!: number;

    @ApiPropertyOptional({
        type: String,
        description: 'Search query string',
        example: 'example',
    })
    search?: string;

    @ApiPropertyOptional({
        description: 'Field to sort by',
        enum: ['name', 'createdAt'],
        example: 'name',
    })
    sortBy!: 'createdAt' | 'name';

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: ['asc', 'desc'],
        example: 'asc',
    })
    sortOrder!: 'asc' | 'desc';
}
