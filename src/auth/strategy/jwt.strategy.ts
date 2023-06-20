import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy, 'jwt_access_strat'){
    constructor(private config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("ACCESS_SECRET")
        })
    }

    validate(payload:any){
        return payload
    }
}

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt_refresh_strat'){
    constructor(private config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("REFRESH_SECRET")
        })
    }

    validate(payload:any){
        return payload
    }
}