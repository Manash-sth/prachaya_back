import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { threadId } from 'worker_threads';

@Injectable()
export class BookmarkService {
    constructor(private prismaservice: PrismaService){}

    async add_bookmark(body, user){
        const bookmark = await this.prismaservice.bookmark.create({
            data: {
                profileid: user.id,
                threadid: threadId
            },
            select: {
                id: true,
                threadid: true,
                profileid: true
            }
        })
    }

    // async delete_bookmark(body, user){
    //     const bookmark = await this.prismaservice.bookmark.delete({
    //         where: {
    //             id: body.id,
    //             profileid: user.id
    //         }
    //     })
    // }
}
