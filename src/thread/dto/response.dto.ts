import { ApiProperty } from '@nestjs/swagger';

class creator{
    @ApiProperty()
    firstname: string

    @ApiProperty()
    middlename: string

    @ApiProperty()
    lastname: string
}

class _count{
    @ApiProperty()
    like: Number

    @ApiProperty()
    comment: Number
}


class thread{
    @ApiProperty()
    id: Number
    
    @ApiProperty()
    title: String
    
    @ApiProperty()
    content: String
    
    @ApiProperty()
    createdAt: String
    
    @ApiProperty()
    creatorid: String
    
    @ApiProperty()
    creator: creator
    
    @ApiProperty()
    _count: _count
}


export class NewThreadResponseDTO{
    @ApiProperty()
    id: Number

    @ApiProperty()
    title: String

    @ApiProperty()
    content: String

    @ApiProperty()
    createdAt: String
    
    @ApiProperty()
    creatorid: String

    @ApiProperty()
    creator: creator

    @ApiProperty()
    _count: _count
}

export class GetThreadResponseDTO{
    @ApiProperty()
    id: Number

    @ApiProperty()
    title: String

    @ApiProperty()
    content: String

    @ApiProperty()
    createdAt: String
    
    @ApiProperty()
    creatorid: String

    @ApiProperty()
    creator: creator

    @ApiProperty()
    _count: _count
}

export class GetThreadCategoryesponseDTO{
    @ApiProperty()
    category: thread
}