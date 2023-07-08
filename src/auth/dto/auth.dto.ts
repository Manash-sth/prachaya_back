import { IsEmail, IsNotEmpty, IsOptional, IsMobilePhone, Length} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class SignupDTO{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    firstname: string

    @ApiProperty()
    @IsOptional()
    middlename: string

    @ApiProperty()
    @IsNotEmpty()
    lastname: string

    @ApiProperty()
    @IsNotEmpty()
    dob: string

    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone("ne-NP")
    mobile_number: string
}


export class LoginDTO{
    @ApiProperty()
    @IsMobilePhone("ne-NP")
    @IsNotEmpty()
    mobile_number: string
}

export class PreDTO{
    @ApiProperty()
    @IsMobilePhone("ne-NP")
    @IsNotEmpty()
    mobile_number: string
}

export class SmsVerifyDTO{
    @ApiProperty()
    @IsMobilePhone("ne-NP")
    @IsNotEmpty()
    mobile_number: string

    @ApiProperty()
    @IsNotEmpty()
    code: string

    @ApiProperty()
    @IsNotEmpty()
    type: string
}