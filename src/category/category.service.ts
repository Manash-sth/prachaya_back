import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private prismaservice: PrismaService){}

    async add_category(body:CategoryDTO){
        try{
            const category = await this.prismaservice.category.create({
                data:{
                    name: body.name,
                    iconname: body.iconname
                }
            })

            return ({
                category: category.name,
                message: "new category created"
            })
        } catch{
            throw new HttpException('Error adding category', HttpStatus.BAD_REQUEST)
        }
    }

    async get_category(){
        try{
            const category = await this.prismaservice.category.findMany()

            return (category)
        } catch{
            throw new HttpException('Error adding category', HttpStatus.BAD_REQUEST)
        }
    }
}
