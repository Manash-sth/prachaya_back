import { IsEmail, IsNotEmpty, IsOptional, IsMobilePhone, Length} from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class BookmarkDTO{
    @ApiProperty()
    @IsNotEmpty()
    thread_id: number

}

export class BookmarkDelDTO{
    @ApiProperty()
    @IsNotEmpty()
    bookmark_id: number    
}