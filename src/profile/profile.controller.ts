import { Controller, Put, Get, Delete, Body, HttpCode, HttpStatus, Param, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JWTAccessGuard } from 'src/auth/guard';
import { Request } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMyProfileResponseDTO, DeleteProfileResponseDTO } from './dto';

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
}
