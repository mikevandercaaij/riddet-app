import { AuthModule } from './auth/auth.module';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

import { CommunityModule } from '../app/community/community.module';
import { ThreadModule } from '../app/thread/thread.module';
import { environment } from '../environments/environment.prod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot( environment.DATABASE_CONNECTION ),  CommunityModule, ThreadModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, 
  AppService
  ],
})
export class AppModule {}
