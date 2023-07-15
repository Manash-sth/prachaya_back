import { Controller, Put, Get, Delete, Body, HttpCode, HttpStatus, Param, UseGuards, Req, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JWTAccessGuard } from 'src/auth/guard';
import { Request } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMyProfileResponseDTO, DeleteProfileResponseDTO } from './dto';
import { ProfileDTO } from './dto/profile.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private profileservice: ProfileService){}

    @ApiHeader({
        name: 'Authentication',
        description: 'Access token',
      })
    @ApiResponse({ 
        status: 201, 
        description: 'Get my profile info',
        type: GetMyProfileResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Get('get_my_profile')
    get_my_profile(@Req() req:Request){
        return this.profileservice.get_my_profile(req.user)
    }

    // @UseGuards(JWTAccessGuard)
    // @HttpCode(HttpStatus.OK)
    // @Get('get_my_likes')
    // get_my_likes(){
    //     return this.profileservice.get_my_likes()
    // }

    @ApiHeader({
        name: 'Authentication',
        description: 'Access token',
      })
    @ApiResponse({ 
        status: 201, 
        description: 'Delete profile',
        type: DeleteProfileResponseDTO
        })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete_profile')
    delete_profile(@Req() req:Request){
        return this.profileservice.delete_profile(req.user)
    }

    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Patch('update_profile')
    update_profile(@Req() req:Request, @Body() bdy:ProfileDTO){
        return this.profileservice.update_profile(bdy, req.user)
    }

    @UseGuards(JWTAccessGuard)
    @HttpCode(HttpStatus.OK)
    @Post('update_avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb)=>{
                cb(null, file.originalname)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        return this.profileservice.update_avatar(file, req.user)
    }
}
