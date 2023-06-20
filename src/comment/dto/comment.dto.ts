import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsMobilePhone, Length} from "class-validator"

export class CommentDTO{
    @ApiProperty()
    @IsNotEmpty()
    content: string

    @ApiProperty()
    @IsNotEmpty()
    parentid: number
}