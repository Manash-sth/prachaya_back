import { Injectable, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { SignupDTO, LoginDTO, PreDTO, SmsVerifyDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { constants } from 'src/constants';


@Injectable()
export class AuthService {
    constructor(private prismaservice: PrismaService, private jwt:JwtService, private config:ConfigService){}

    async phone_number_verification(body: PreDTO){
        try{
            const existing_number = await this.prismaservice.user.findFirst({
                where: {
                    misidn: body.mobile_number
                }
            })
            
            if(existing_number){
                const send_sms:string = await this.send_sms(existing_number.misidn)
                console.log(send_sms)
                await this.prismaservice.user.update({
                    where: {
                        id: existing_number.id
                    },
                    data: {
                        sms_secret: send_sms
                    }
                })
                return{
                    "msg": "sms sent",
                    "user_exists": true,
                    "type": "login",
                    "code": send_sms            // TODO: Remove this
                }
            }

            const user_preregistered = await this.prismaservice.pre_register.findFirst({
                where: {
                    misidn: body.mobile_number
                }
            })

            if(user_preregistered){
                await this.prismaservice.pre_register.delete({
                    where: {
                        misidn: body.mobile_number
                    }
                })
            }
    
            const send_sms = await this.send_sms(body.mobile_number)
    
            const new_user = await this.prismaservice.pre_register.create({
                data: {
                    misidn: body.mobile_number,
                    code: send_sms
                }
            })
    
            return{
                    "msg": "sms sent",
                    "user_exists": false,
                    "type": "signup",
                    "code": send_sms
                }
        }
        catch(err){
            console.log(err)
            throw new HttpException('Error verifying number', HttpStatus.BAD_REQUEST)
        }
    }

    async verify_sms_code(body: SmsVerifyDTO){
        const pre_register = await this.prismaservice.pre_register.findUnique({
            where: {
                misidn: body.mobile_number
            }
        })

        if(!pre_register && body.type==='login'){
            const login = this.login(body.mobile_number)
            return login
        }

        await this.prismaservice.pre_register.update({
            where: {
                misidn: pre_register.misidn
            },
            data: {
                count: pre_register.count+1
            }
        })

        if(pre_register.count >=3){
            await this.prismaservice.pre_register.delete({
                where: {
                    misidn: pre_register.misidn
                }
            })
            return({
                msg: "too many wrong attempts"
            })
        }

        if(body.code === pre_register.code && pre_register.count<3){
            await this.prismaservice.pre_register.update({
                where: {
                    misidn: pre_register.misidn
                },
                data: {
                    verified: true
                }
            })
            return({
                msg: "verification success"
            })
        }

        return({
            msg: "verification failed"
        })
    }

    async signup(body:SignupDTO){
        try{
            const pre_register = await this.prismaservice.pre_register.findFirst({
                where: {
                    misidn: body.mobile_number
                }
            })

            if(!pre_register.verified){
                return({
                    msg: "phone number not verified"
                })
            }

            await this.prismaservice.pre_register.delete({
                where: {
                    misidn: pre_register.misidn
                }
            })

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

    async login(mobile_number:string){
        const user = await this.prismaservice.user.findFirst({
            where:{
                misidn: mobile_number
            },
            select:{
                id: true,
                misidn: true,
                email: true,
                role: true,
                profile: {
                    select: {
                        id: true,
                        firstname: true,
                        middlename: true,
                        lastname: true
                        
                    }
                }
            }
        })

        const refresh_token = await this.sign_jwt_refresh(user['id'], user['email'], user['role'])
        const access_token = await this.sign_jwt_access(user['profile']['id'], user['email'], user['role'])
        

        return({
            email:user.email,
            phone_number: user.misidn,
            firstname: user.profile.firstname,
            middlename: user.profile.middlename,
            lastname: user.profile.lastname,
            access_token: access_token,
            refresh_token: refresh_token
        })
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
    
    
    async send_sms(mobile_no: string){
        const accountSid = this.config.get("ACCOUNTSID")
        const authToken = this.config.get("AUTHTOKEN")
        const client = require('twilio')(accountSid, authToken);
    
        const secret = this.generate_random(6)
    
        // client.messages
        //     .create({
        //         body: `\nYour verification code for prachaya is: ${secret} \nDo not share it with anyone.`,
        //         messagingServiceSid: this.config.get("MESSAGESERVICE"),
        //         to: `+977${mobile_no}`
        //     })
        //     .then(message => console.log(message.sid))
        
        return secret
    }

    generate_random(length: number){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
}









// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
