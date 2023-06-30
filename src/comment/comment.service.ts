import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDTO } from './dto';

@Injectable()
export class CommentService {
    constructor(private prismaservice: PrismaService){}

    async add_comment(body:CommentDTO, id:object, jwt_info:object){
        try{
            const profile_id = Number(jwt_info['sub'])
            const thread_id = Number(id['thread_id'])
            const comment = await this.prismaservice.comment.create({
                data:{
                    content: body.content,
                    profileid: profile_id,
                    threadid: thread_id,
                    parentid: body.parentid
                }
            })

            return({
                'message': "comment added",
                'id': comment.id,
                'thread_id': thread_id
            })
        } catch{
            throw new HttpException('Error posting comment', HttpStatus.BAD_REQUEST)
        }
    }

    async get_comment(id:object){
        try{
            const thread_id = Number(id['thread_id'])

            const comment = await this.prismaservice.comment.findMany({
                where:{
                    threadid: thread_id,
                    parentid: null
                },
                select: {
                    id: true,
                    content: true,
                    _count:{
                        select:{
                            child: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return comment
        } catch{
            throw new HttpException('Error fetching comment', HttpStatus.BAD_REQUEST)
        }
    }

    async get_child_comment(id:object){
        try{
            const comment_id = Number(id['comment_id'])

            const comment = await this.prismaservice.comment.findFirst({
                where:{
                    id: comment_id
                },
                select: {
                    child: {
                        select:{
                            id: true,
                            content: true,
                            _count:{
                                select:{
                                    child: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return(comment.child)
        } catch{
            throw new HttpException('Error fetching child comment', HttpStatus.BAD_REQUEST)
        }
    }

    async delete_comment(id: object){
        try{
            const comment_id = Number(id['comment_id'])
            const comment = await this.prismaservice.comment.delete({
                where:{
                    id: comment_id
                },
            })
            return({
                'message': 'comment deleted'
            })
        } catch{
            throw new HttpException('Error deleting comment', HttpStatus.BAD_REQUEST)
        }

    }
}
