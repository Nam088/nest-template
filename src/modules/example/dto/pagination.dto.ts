import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaginationDto {
    @ApiProperty({
        type: Number,
        description: 'Number of items per page',
        example: 10,
    })
    @Expose()
    limit!: number;

    @ApiProperty({
        type: Number,
        description: 'Current page number',
        example: 1,
    })
    @Expose()
    page!: number;

    @ApiProperty({
        type: Number,
        description: 'Total number of items',
        example: 100,
    })
    @Expose()
    total!: number;

    @ApiProperty({
        type: Number,
        description: 'Total number of pages',
        example: 10,
    })
    @Expose()
    totalPages!: number;
}
