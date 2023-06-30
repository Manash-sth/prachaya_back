import { ApiProperty } from '@nestjs/swagger';

class profile{
    @ApiProperty()
    misidn: string

    @ApiProperty()
    misidn_verified: boolean

    @ApiProperty()
    email: string

    @ApiProperty()
    email_verified: boolean
}

class count{
    @ApiProperty()
    author: Number
}

export class GetMyProfileResponseDTO{
    @ApiProperty()
    firstname: string

    @ApiProperty()
    middlename: string

    @ApiProperty()
    lastname: string

    @ApiProperty()
    user: profile

    @ApiProperty()
    _count: count

}

export class DeleteProfileResponseDTO{
    @ApiProperty()
    message: string
}
