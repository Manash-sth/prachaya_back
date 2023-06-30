import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDTO{
    @ApiProperty()
    email: String
    
    @ApiProperty()
    phone_number: String

    @ApiProperty()
    firstname: String

    @ApiProperty()
    middlename: String

    @ApiProperty()
    lastname: String

    @ApiProperty()
    access_token: String

    @ApiProperty()
    refresh_token: String
}

export class LoginResponseDTO{
    @ApiProperty()
    email: String
    
    @ApiProperty()
    phone_number: String

    @ApiProperty()
    firstname: String

    @ApiProperty()
    middlename: String

    @ApiProperty()
    lastname: String

    @ApiProperty()
    access_token: String

    @ApiProperty()
    refresh_token: String
}

export class NewAccessDTO{
    @ApiProperty()
    access_token: String
}
