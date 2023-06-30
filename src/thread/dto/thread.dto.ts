import { ApiProperty } from "@nestjs/swagger"
import {IsNotEmpty} from "class-validator"

export class ThreadDTO{
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    content: string

    @ApiProperty()
    @IsNotEmpty()
    category_id: number
}