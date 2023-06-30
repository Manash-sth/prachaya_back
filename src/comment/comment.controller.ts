import { Controller, Post, Get, Body, HttpCode, HttpStatus, Param, Req, UseGuards, Delete} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JWTAccessGuard } from 'src/auth/guard';
import { Request } from 'express';
import { CommentDTO, AddCommentResponseDTO, GetCommentResponseDTO, GetChildCommentResponseDTO, DeleteCommentResponseDTO } from './dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private commentservice: CommentService){}

    @ApiHeader({
        name: 'Authentication',
        description: 'Access token',
      })
    @ApiResponse({ 
        status: 201, 
        description: 'Comment added',
        type: AddCommentResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Post('add_comment/:thread_id')
    add_comment(@Body() bdy:CommentDTO, @Param() thread_id:any, @Req() req:Request){
        return this.commentservice.add_comment(bdy, thread_id, req.user)
    }

    @ApiResponse({ 
        status: 201, 
        description: 'Get Comments in array',
        type: GetCommentResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    // @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_comment/:thread_id')
    get_comment(@Param() thread_id:any){
        return this.commentservice.get_comment(thread_id)
    }

    @ApiResponse({ 
        status: 201, 
        description: 'Get Child Comments in array',
        type: GetChildCommentResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    // @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_child_comment/:comment_id')
    get_child_comment(@Param() comment_id:any){
        return this.commentservice.get_child_comment(comment_id)
    }

    @ApiResponse({ 
        status: 201, 
        description: 'Comments Deleted',
        type: DeleteCommentResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete_comment/:comment_id')
    delete_comment(@Param() comment_id:any){
        return this.commentservice.delete_comment(comment_id)
    }

}
