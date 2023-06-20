import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prismaservice: PrismaService){}

    async get_my_profile(jwt_info:object){
        try{
            const profile_id = jwt_info['sub']

            const profile = await this.prismaservice.profile.findUnique({
                where:{
                    id: profile_id
                },
                select: {
                    firstname: true,
                    middlename: true,
                    lastname: true,
                    user: {
                        select: {
                            misidn: true,
                            misidn_verified: true,
                            email: true,
                            email_verified: true
                        }
                    },
                    _count: {
                        select: {
                            author: true
                        }
                    }
                },
            })
            return(profile)
        } catch{
            throw new HttpException('Error fetching profile', HttpStatus.BAD_REQUEST)
        }
    }

    async get_profile(id:object){
        try{
            const profile_id = Number(id['id'])

            const profile = await this.prismaservice.profile.findUnique({
                where:{
                    id: profile_id
                },
                select: {
                    firstname: true,
                    middlename: true,
                    lastname: true,

                    _count: {
                        select: {
                            author: true
                        }
                    }
                }
            })
            return(profile)
        } catch{
            throw new HttpException('Error fetching profile', HttpStatus.BAD_REQUEST)
        }

    }

    // async get_my_likes(){
    //     const profile_id = 6

    //     const likes = await this.prismaservice.profile.findUnique({
    //         where:{
    //             id: profile_id
    //         },
    //         select: {
    //             like: {
    //                 select:{
    //                     id: true,
    //                     thread: {
    //                         select: {
    //                             id: true,
    //                             title: true
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     })
    //     return(likes)
    // }

    async delete_profile(id:object){
        try{
            const profile_id = Number(id['sub'])

            const profile_info = await this.prismaservice.profile.findFirst({
                where: {
                    id: profile_id
                },
                select: {
                    firstname: true,
                    middlename: true,
                    lastname: true,
                    user: {
                        select: {
                            id: true,
                            misidn: true,
                            email: true
                        }
                    }
                }
            })

            const del_profile_info = {
                'firstname': profile_info.firstname,
                'middlename': profile_info.middlename,
                'lastname': profile_info.lastname
                }

            const del_user_info = {
                'misidn': profile_info.user.misidn,
                'email': profile_info.user.email,
                }

            const profile = await this.prismaservice.profile.update({
                where: {
                    id: profile_id,
                },
                data: {
                    del_user_info: del_profile_info,
                    firstname: "[Deleted User]",
                    middlename: "",
                    lastname: ""
                }
            })

            const user = await this.prismaservice.user.update({
                where: {
                    id: profile_info.user.id,
                },
                data: {
                    del_user_info: del_user_info,
                    misidn: "",
                    email: "",
                    deleted: true
                }
            })

            return({
                'message': 'user account deleted'
            })
        } catch(err){
            console.log(err)
            throw new HttpException('Error while deleting profile', HttpStatus.BAD_REQUEST)
        }


    }
}
