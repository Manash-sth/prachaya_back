import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO, AddCategoryResponseDTO, GetCategoryResponseDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryservice: CategoryService){}

    @ApiResponse({ 
        status: 201,
        description: 'Logged in',
        type: AddCategoryResponseDTO
      })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @HttpCode(HttpStatus.OK)
    @Post('add_category')
    add_category(@Body() bdy:CategoryDTO){
        return this.categoryservice.add_category(bdy)
    }

    @ApiResponse({ 
        status: 201, 
        description: 'Logged in',
        type: GetCategoryResponseDTO
      })
    @ApiResponse({ status: 400, description: 'Bad Request'})
    @HttpCode(HttpStatus.OK)
    @Get('get_category')
    get_category(){
        return this.categoryservice.get_category()
    }
}
