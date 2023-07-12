import { Injectable, HttpException,  HttpStatus} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeDTO } from './dto';
import { error } from 'console';

@Injectable()
export class LikeService {
    constructor(private prismaservice:PrismaService){}

    async add_like(id: object, jwt_info:object){
        try{
            const profile_id = Number(jwt_info['sub'])
            const thread_id = Number(id['thread_id'])
            const like = await this.prismaservice.like.create({
                data:{
                    profileid: profile_id,
                    threadid: thread_id
                },
                select: {
                    thread: {
                        select:{
                            id: true,
                            _count: {
                                select: {
                                    like: true
                                }
                            }
                        }
                    }
                }
            })

            return ({
                "message": 'Like added',
                "thread_id": like['thread']['id'],
                "like_count": like['thread']['_count']['like']
            })
        }catch(error){
            if(error.code == 'P2002'){
                throw new HttpException("User already liked the post", HttpStatus.BAD_REQUEST)
            }
            throw new HttpException("Error while attempting to like thread", HttpStatus.BAD_REQUEST)

        }
    }

    async remove_like(id: object, jwt_info:object){
        try{
            const profile_id = Number(jwt_info['sub'])
            const thread_id = Number(id['thread_id'])
            const like = await this.prismaservice.like.delete({
                where: {
                    profileid_threadid: {
                        profileid: profile_id,
                        threadid: thread_id
                    }
                },
            })

            return ({
                "message": 'Like removed',
            })
        }catch(error){
            if(error.code == 'P2002'){
                throw new HttpException("User already liked the post", HttpStatus.BAD_REQUEST)
            }
            throw new HttpException("Error while attempting to unlike thread", HttpStatus.BAD_REQUEST)

        }
    }


    // TODO: Change getting count by counting like from thread table
    async get_like_count(id:object){
        try{
            const thread_id = Number(id['thread_id'])
            const like = await this.prismaservice.like.findMany({
                where:{
                    threadid: thread_id
                },
                select: {
                    profileid: true
                }
            })
            return like
        } catch{
            throw new HttpException('Error fetching like count', HttpStatus.BAD_REQUEST)
        }
    }

    // TODO: Change getting like from thread table
    // async get_like(id:any){
    //     const thread_id = Number(id['id'])
    //     const like = await this.prismaservice.like.findMany({
    //         where:{
    //             threadid: thread_id
    //         },
    //         select:{
    //             id: true,
    //             profile: {
    //                 select:{
    //                     id: true,
    //                     firstname: true,
    //                     middlename: true,
    //                     lastname: true
    //                 }
    //             },
    //             threadid: true,
    //         }
    //     })
    //     return(like)
    // }
}
