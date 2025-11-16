import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose, Type } from 'class-transformer';

import { PaginationDto } from '@nam088/nestjs-kit';

import { ExampleResponseDto } from '@/modules/example/dto/example-response.dto';

@Exclude()
export class ExampleListResponseDto {
    @ApiProperty({
        type: [ExampleResponseDto],
        description: 'List of examples',
        isArray: true,
    })
    @Expose()
    @Type(() => ExampleResponseDto)
    items!: ExampleResponseDto[];

    @ApiProperty({
        type: PaginationDto,
        description: 'Pagination information',
    })
    @Expose()
    @Type(() => PaginationDto)
    pagination!: PaginationDto;
}
