import { ApiProperty } from '@nestjs/swagger';

export class AddLikeResponseDTO{
    @ApiProperty()
    message: String

    @ApiProperty()
    thread_id: Number
    
    @ApiProperty()
    like_count: Number
}

export class RemoveLikeResponseDTO{
    @ApiProperty()
    message: String
}

export class LikeCountResponseDTO{
    @ApiProperty()
    like_count: Number
}
