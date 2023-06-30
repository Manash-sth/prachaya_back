import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAccessStrategy, JWTRefreshStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JWTAccessStrategy, JWTRefreshStrategy]
})
export class AuthModule {}
