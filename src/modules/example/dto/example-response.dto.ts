import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ExampleResponseDto {
    @ApiProperty({
        type: String,
        description: 'Unique identifier of the example',
        example: 'example-1',
    })
    @Expose()
    id!: string;

    @ApiProperty({
        type: String,
        description: 'Name of the example',
        example: 'Example Name',
    })
    @Expose()
    name!: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Description of the example',
        example: 'This is an example description',
    })
    @Expose()
    description?: string;

    @ApiPropertyOptional({
        type: Number,
        description: 'Price of the example',
        example: 99.99,
    })
    @Expose()
    price?: number;

    @ApiProperty({
        type: [String],
        description: 'Tags associated with the example',
        example: ['tag1', 'tag2'],
        isArray: true,
    })
    @Expose()
    tags!: string[];

    @ApiProperty({
        type: Date,
        description: 'Date when the example was created',
        example: '2024-01-01T00:00:00.000Z',
    })
    @Expose()
    createdAt!: Date;

    @ApiProperty({
        type: Date,
        description: 'Date when the example was last updated',
        example: '2024-01-01T00:00:00.000Z',
    })
    @Expose()
    updatedAt!: Date;
}
