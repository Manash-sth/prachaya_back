import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThreadDTO } from './dto';

@Injectable()
export class ThreadService {
    constructor(private prismaservice:PrismaService){}

    async new_thread(body: ThreadDTO, jwt_info:object){
        try{
            const creator_id = jwt_info['sub']
            const thread = await this.prismaservice.thread.create({
                data:{
                    title: body.title,
                    content: body.content,
                    creatorid: creator_id,
                    categoryId: body.category_id
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    creatorid: true,
                    creator: {
                        select: {
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            avatar: true
                        }
                    },
                    categoryId: true,
                    _count: {
                        select: {
                            like: true,
                            comment: true
                        }
                    }

                }
            })
            return(thread)
        } catch{
            throw new HttpException('Error posting new thread', HttpStatus.BAD_REQUEST)
        }
    }

    async get_thread(id:object){
        try{
            const thread_id = Number(id['thread_id'])
            const thread = await this.prismaservice.thread.findFirst({
                where:{
                    id: thread_id
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    creatorid: true,
                    creator: {
                        select: {
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            avatar: true
                        }
                    },
                    categoryId: true,
                    _count: {
                        select: {
                            like: true,
                            comment: true
                        }
                    }

                }
            })
            return(thread)
        } catch{
            throw new HttpException('Error fetching thread', HttpStatus.BAD_REQUEST)
        }
    }

    async get_thread_category(cat_id: number){
        try{
            const category_id = Number(cat_id['category_id'])
            const thread = await this.prismaservice.category.findUnique({
                where:{
                    id: category_id
                },
                select: {
                    thread: {
                        // skip:1,
                        // take:2,
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            createdAt: true,
                            creatorid: true,
                            creator: {
                                select: {
                                    firstname: true,
                                    middlename: true,
                                    lastname: true,
                                    avatar: true
                                }
                            },
                            categoryId: true,
                            _count: {
                                select: {
                                    like: true,
                                    comment: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                },
            })
            return(thread)
        } catch(err){
            console.log(err)
            throw new HttpException('Error fetching threads by category', HttpStatus.BAD_REQUEST)
        }
    }

    // Temporary
    async get_thread_all(){
        try{
            const thread = await this.prismaservice.thread.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    creatorid: true,
                    creator: {
                        select: {
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            avatar: true
                        }
                    },
                    categoryId: true,
                    _count: {
                        select: {
                            like: true,
                            comment: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return(thread)
        } catch(err){
            console.log(err)
            throw new HttpException('Error fetching threads by category', HttpStatus.BAD_REQUEST)
        }
    }
}
