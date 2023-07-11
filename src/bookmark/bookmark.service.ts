import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDTO, BookmarkDelDTO } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prismaservice: PrismaService){}

    async add_bookmark(body:BookmarkDTO, jwt_info:object){
        const profile_id = jwt_info['sub']
        const thread_id = body.thread_id
        const bookmark = await this.prismaservice.bookmark.create({
            data: {
                profileid: profile_id,
                threadid: thread_id
            },
            select: {
                id: true,
                threadid: true,
            }
        })
        return({
            msg: 'bookmark added',
            id: bookmark.id,
            thread_id: bookmark.threadid
        })
    }

    async delete_bookmark(body:BookmarkDelDTO, jwt_info:object){
        const profile_id = jwt_info['sub']
        const bookmark_id = body.bookmark_id
        const bookmark = await this.prismaservice.bookmark.delete({
            where: {
                id: body.bookmark_id
            }
        })
        return({
            msg:'bookmark removed'
        })
    }

    async get_bookmark(jwt_info:object){
        const profile_id = jwt_info['sub']
        const bookmark = await this.prismaservice.bookmark.findMany({
            where: {
                profileid: profile_id
            },
            select: {
                id: true,
                thread:{
                    select:{
                        id: true,
                        title: true,
                        archived: true,
                        _count: {
                            select: {
                                like: true,
                                comment: true
                            }
                        }
                    }
                }
            }
        })
        
        return bookmark
    }
}
