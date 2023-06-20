import { ApiProperty } from '@nestjs/swagger';

export class AddCommentResponseDTO{
    @ApiProperty()
    category: String

    @ApiProperty()
    id: Number

    @ApiProperty()
    thread_id: Number
}

class _count{
    @ApiProperty()
    child: Number
}

class comment{
    @ApiProperty()
    id: Number

    @ApiProperty()
    content: String

    @ApiProperty()
    _count: _count
}

export class GetCommentResponseDTO{
    @ApiProperty()
    comment: comment
}

export class GetChildCommentResponseDTO{
    @ApiProperty()
    comment: comment
}

export class DeleteCommentResponseDTO{
    @ApiProperty()
    message: String
}