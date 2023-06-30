import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseService } from './base.service'

@Controller('')
export class BaseController {
    constructor(private baseservice: BaseService){}

    @HttpCode(HttpStatus.OK)
    @Get('/')
    signup(){
        return this.baseservice.base()
    }


}
