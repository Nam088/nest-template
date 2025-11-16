import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteExampleResponseDto {
    @ApiProperty({
        type: String,
        description: 'Success message',
        example: 'Example with ID example-1 has been deleted',
    })
    @Expose()
    message!: string;
}
