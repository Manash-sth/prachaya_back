import { Controller, Post, Get, Body, HttpCode, HttpStatus, Param, UseGuards, Req } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadDTO, NewThreadResponseDTO, GetThreadResponseDTO, GetThreadCategoryesponseDTO } from './dto';
import { JWTAccessGuard } from 'src/auth/guard';
import { Request } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Thread')
@Controller('thread')
export class ThreadController {
    constructor(private threadservice:ThreadService){}

    @ApiHeader({
        name: 'Authentication',
        description: 'Access token',
      })
    @ApiResponse({ 
        status: 201, 
        description: 'Add New Thread',
        type: NewThreadResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Post('new_thread')
    new_thread(@Body() bdy:ThreadDTO, @Req() req:Request){
        return this.threadservice.new_thread(bdy, req.user)
    }

    @ApiResponse({ 
        status: 201, 
        description: 'Get Thread',
        type: GetThreadResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_thread/:thread_id')
    get_thread(@Param() thread_id: any){
        return this.threadservice.get_thread(thread_id)
    }

    @ApiResponse({ 
        status: 201, 
        description: 'Get Thread By Categoty in array',
        type: GetThreadCategoryesponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_thread_category/:category_id')
    get_thread_category(@Param() category_id: any){
        return this.threadservice.get_thread_category(category_id)
    }
}
