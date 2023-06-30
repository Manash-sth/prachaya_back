import { Injectable, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { SignupDTO, LoginDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth'
import { constants } from 'src/constants';


@Injectable()
export class AuthService {
    constructor(private prismaservice: PrismaService, private jwt:JwtService, private config:ConfigService){}

    async signup(body:SignupDTO){

        try{
            const user = await this.prismaservice.user.create({
                data:{
                    email: body.email,
                    misidn: body.mobile_number
                },
            })

            const profile = await this.prismaservice.profile.create({
                data:{
                    firstname: body.firstname,
                    middlename: body.middlename,
                    lastname: body.lastname,
                    userId: user.id
                },
            })

            const access = await this.sign_jwt_access(profile.id, user.email, user.role)
            const refresh = await this.sign_jwt_refresh(user.id, user.email, user.role)

            return ({
                email:user.email,
                phone_number: user.misidn,
                firstname: profile.firstname,
                middlename: profile.middlename,
                lastname: profile.lastname,
                access_token: access,
                refresh_token: refresh,
            })
        }catch(error){
            throw new ForbiddenException("Credential taken")
            // if (error instanceof PrismaClientKnownRequestError){
            //     throw new ForbiddenException(
            //         "Credential taken"
            //     )
            // }
            // throw error
        }
    }

    async login(body: LoginDTO){

        // const idToken = ""

        // var serviceAccount = require("../../pracharya-78389-firebase-adminsdk-4xe39-9c5261b5dc.json");

        // console.log(serviceAccount)

        // const app = initializeApp({
        //     credential: cert(serviceAccount)
        // });

        // getAuth()
        // .verifyIdToken(idToken)
        // .then((decodedToken) => {
        //     console.log(decodedToken)

        //     const uid = decodedToken.uid;
        //     // ...
        // })
        // .catch((error) => {
        //     console.log(error)
        //     // Handle error
        // });

        // return("waha")

        const user = await this.prismaservice.user.findFirst({
            where:{
                misidn: body.mobile_number
            },
            select:{
                email: true,
                role: true,
                profile: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        const access_token = await this.sign_jwt_access(user['profile']['id'], user['email'], user['role'])

        return({"access_token": access_token})
    }

    async new_access_token(id:object){
        try{
            const user_id = Number(id['sub'])
            const email = id['email']
            const profile = await this.prismaservice.user.findUnique({
                where: {
                    id: user_id,
                    // email: email
                },
                select: {
                    email: true,
                    role: true,
                    profile: {
                        select:{
                            id: true,
                        }
                    }
                }
            })

            const access_token = await this.sign_jwt_access(profile.profile.id, profile.email, profile.role)

            return({"access_token": access_token})
        } catch{
            throw new HttpException('error generating new access token', HttpStatus.BAD_REQUEST)
        }
    }

    async sign_jwt_access(profileid:number, email:string, role: string){
        const payload = {
            sub: profileid,
            email,
            role
        }

        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get("ACCESS_SECRET"),
            expiresIn: constants.ACCESS_TIMEOUT
        })

        return token
    }

    async sign_jwt_refresh(userid:number, email:string, role: string){
        const payload = {
            sub: userid,
            email,
            role
        }

        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get("REFRESH_SECRET"),
            expiresIn: constants.REFRESH_TIMEOUT
        })

        return token
    }
}
