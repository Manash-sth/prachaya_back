import { IsEmail, IsNotEmpty, IsOptional, IsMobilePhone, Length} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO{
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    iconname: string

}