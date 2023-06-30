import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThreadModule } from './thread/thread.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { BaseModule } from './base/base.module';

@Module({
  imports: [
    BaseModule,
    AuthModule,
    ProfileModule,
    PrismaModule,
    CategoryModule,
    ThreadModule,
    BookmarkModule,
    LikeModule,
    CommentModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],

})
export class AppModule {}
