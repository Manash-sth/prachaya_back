import { Controller, Post, Get, Delete, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JWTAccessGuard } from 'src/auth/guard';
import { Request } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddLikeResponseDTO, RemoveLikeResponseDTO, LikeCountResponseDTO } from './dto';

@ApiTags('Like')
@Controller('like')
export class LikeController {
    constructor(private likeservice: LikeService){}

    @ApiHeader({
        name: 'Authentication',
        description: 'Access token',
      })
    @ApiResponse({ 
        status: 201, 
        description: 'Like Added',
        type: AddLikeResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Post('add_like/:thread_id')
    add_like(@Param() thread_id:any, @Req() req:Request){
        return this.likeservice.add_like(thread_id, req.user)
    }

    @ApiHeader({
        name: 'Authentication',
        description: 'Access token',
      })
    @ApiResponse({ 
    status: 201, 
    description: 'Like Removed',
    type: RemoveLikeResponseDTO
    })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('remove_like/:thread_id')
    remove_like(@Param() thread_id:any, @Req() req:Request){
        return this.likeservice.remove_like(thread_id, req.user)
    }
    
    @ApiResponse({ 
        status: 201, 
        description: 'Like count',
        type: LikeCountResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @HttpCode(HttpStatus.OK)
    @Get('get_like_count/:thread_id')
    get_like_count(@Param() thread_id: any){
        return this.likeservice.get_like_count(thread_id)
    }

    // @UseGuards(JWTAccessGuard)
    // @HttpCode(HttpStatus.OK)
    // @Get('get_like/:id')
    // get_like(@Param() id: any){
    //     return this.likeservice.get_like(id)
    // }
}
