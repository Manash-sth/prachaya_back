import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Req, Delete } from '@nestjs/common';
import { BookmarkDTO, BookmarkDelDTO } from './dto';
import { BookmarkService } from './bookmark.service';
import { JWTAccessGuard } from 'src/auth/guard';
import { Request } from 'express';


@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkservice: BookmarkService){}

    @HttpCode(HttpStatus.OK)
    @Post('add_bookmark')
    @UseGuards(JWTAccessGuard)
    add_bookmark(@Req() req:Request, @Body() bdy:BookmarkDTO){
        return this.bookmarkservice.add_bookmark(bdy, req.user)
    }

    @HttpCode(HttpStatus.OK)
    @Get('get_bookmark')
    @UseGuards(JWTAccessGuard)
    get_bookmark(@Req() req:Request){
        return this.bookmarkservice.get_bookmark(req.user)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('del_bookmark')
    @UseGuards(JWTAccessGuard)
    del_bookmark(@Req() req:Request, @Body() bdy:BookmarkDelDTO){
        return this.bookmarkservice.delete_bookmark(bdy, req.user)
    }

}
