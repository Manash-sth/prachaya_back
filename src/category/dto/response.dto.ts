import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryResponseDTO{
    @ApiProperty()
    category: String

    @ApiProperty()
    message: String
}

export class GetCategoryResponseDTO{
    @ApiProperty()
    category: String[]
}