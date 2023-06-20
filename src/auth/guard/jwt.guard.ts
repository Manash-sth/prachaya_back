import { AuthGuard } from "@nestjs/passport";

export class JWTAccessGuard extends AuthGuard('jwt_access_strat'){
    constructor(){
        super()
    }
}


export class JWTRefreshGuard extends AuthGuard('jwt_refresh_strat'){
    constructor(){
        super()
    }
}