import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { z } from 'zod';

export const createExampleSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    tags: z.array(z.string()).optional().default([]),
});

export type CreateExampleDtoType = z.infer<typeof createExampleSchema>;

export class CreateExampleDto implements CreateExampleDtoType {
    @ApiProperty({
        type: String,
        description: 'Name of the example',
        example: 'Example Name',
        maxLength: 100,
        minLength: 1,
    })
    name!: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Description of the example',
        example: 'This is an example description',
    })
    description?: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Price of the example',
        example: 99.99,
        minimum: 0,
    })
    price?: number;

    @ApiPropertyOptional({
        type: [String],
        description: 'Tags associated with the example',
        example: ['tag1', 'tag2'],
        isArray: true,
    })
    tags!: string[];
}
