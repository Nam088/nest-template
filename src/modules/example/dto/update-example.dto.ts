import { ApiPropertyOptional } from '@nestjs/swagger';

import type { z } from 'zod';

import { createExampleSchema } from '@/modules/example/dto';

export const updateExampleSchema = createExampleSchema.partial();

export type UpdateExampleDtoType = z.infer<typeof updateExampleSchema>;

export class UpdateExampleDto implements UpdateExampleDtoType {
    @ApiPropertyOptional({
        type: String,
        description: 'Name of the example',
        example: 'Updated Example Name',
        maxLength: 100,
        minLength: 1,
    })
    name?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Description of the example',
        example: 'This is an updated example description',
    })
    description?: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Price of the example',
        example: 149.99,
        minimum: 0,
    })
    price?: number;

    @ApiPropertyOptional({
        type: [String],
        description: 'Tags associated with the example',
        example: ['tag1', 'tag2', 'tag3'],
        isArray: true,
    })
    tags?: string[];
}
