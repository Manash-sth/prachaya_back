import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignupDTO, LoginDTO, SignupResponseDTO, LoginResponseDTO, NewAccessDTO, PreDTO, SmsVerifyDTO } from './dto';
import { JWTRefreshGuard } from './guard';
import { Request } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}

    /*
    SignUP
    */
    @ApiHeader({
        name: 'Authentication',
        description: 'Access token from google',
      })
    @ApiResponse({ 
      status: 201, 
      description: 'User created',
      type: SignupResponseDTO
    })
    @ApiResponse({ status: 403, description: 'Forbidden'})
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() bdy:SignupDTO){
        return this.authservice.signup(bdy)
    }

    /*
    LogIn
    */
    // @ApiHeader({
    //     name: 'Authentication',
    //     description: 'Access token from google',
    //   })
    // @ApiResponse({ 
    //   status: 201, 
    //   description: 'Logged in',
    //   type: LoginResponseDTO
    // })
    // @ApiResponse({ status: 403, description: 'Forbidden'})
    // @HttpCode(HttpStatus.OK)
    // @Get('login')
    // login(@Body() bdy:LoginDTO){
    //     return this.authservice.login(bdy)
    // }

    /*
    New Access Token
    */
    @ApiHeader({
        name: 'Authentication',
        description: 'Refresh token',
      })
    @ApiResponse({ 
      status: 201, 
      description: 'New access token',
      type: NewAccessDTO
    })
    @ApiResponse({ status: 403, description: 'Forbidden'})
    @UseGuards(JWTRefreshGuard)
    @HttpCode(HttpStatus.OK)
    @Get('new_access_token')
    new_access_token(@Req() req:Request){
        return this.authservice.new_access_token(req.user)
    }

    @HttpCode(HttpStatus.OK)
    @Post('number_verify')
    send_sms(@Body() bdy:PreDTO){
      return this.authservice.phone_number_verification(bdy)
    }

    @HttpCode(HttpStatus.OK)
    @Post('sms_verify')
    verify_sms(@Body() bdy:SmsVerifyDTO){
      return this.authservice.verify_sms_code(bdy)
    }
}