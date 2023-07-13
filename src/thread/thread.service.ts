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
                    verified: true,
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
                    like: {
                        select: {
                            profileid: true
                        }
                    },
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
                    id: thread_id,
                    verified: true
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    verified: true,
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
                    like: {
                        select: {
                            profileid: true
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
                    id: category_id,
                },
                select: {
                    thread: {
                        where:{
                            verified: true
                        },
                        // skip:1,
                        // take:2,
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            verified: true,
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
                            like: {
                                select: {
                                    profileid: true
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
                where:{
                    verified: true
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    creatorid: true,
                    verified: true,
                    creator: {
                        select: {
                            firstname: true,
                            middlename: true,
                            lastname: true,
                            avatar: true
                        }
                    },
                    like: {
                        select: {
                            profileid: true
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

    async verify_thread(id:number, jwt_info:object){
        try{
            const thread_id = Number(id['id'])
            const adm_role = jwt_info['role']
    
            console.log(adm_role)
    
            if (adm_role === 'ADMIN'){
                const thread = await this.prismaservice.thread.update({
                    where:{
                        id: thread_id
                    },
                    data:{
                        verified: true
                    }
                })
                return({
                    msg: "thread verified"
                })
            }

            return({
                msg: "thread verification failed"
            })

        }catch(err){
            console.log(err)
            throw new HttpException('Error verifying thread', HttpStatus.BAD_REQUEST)
        }
    }

    async get_unverified_thread(jwt_info:object){
        try{
            const adm_role = jwt_info['role']
    
            if (adm_role === 'ADMIN'){
                const thread = await this.prismaservice.thread.findMany({
                    where:{
                        verified: false
                    },
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        creatorid: true,
                        verified: true,
                        creator: {
                            select: {
                                firstname: true,
                                middlename: true,
                                lastname: true,
                                avatar: true
                            }
                        },
                        like: {
                            select: {
                                profileid: true
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
                        createdAt: 'asc'
                    }
                })
                return thread
            }

            return({
                msg: "not an admin"
            })

        }catch(err){
            console.log(err)
            throw new HttpException('Error fetchinf unverified thread', HttpStatus.BAD_REQUEST)
        }
    }
}
