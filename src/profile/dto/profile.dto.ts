import { IsEmail, IsNotEmpty, IsOptional, IsMobilePhone, Length} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDTO{
    @ApiProperty()
    firstname: number

    @ApiProperty()
    middlename: number

    @ApiProperty()
    lastname: number

    @ApiProperty()
    email: number
}