import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityModule } from '../community/community.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
        ]), forwardRef(() => CommunityModule)
      ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
