import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityModule } from '../community/community.module';
// import { Neo4jModule } from '../neo4j/neo4j.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports: [
      // Neo4jModule.forRoot({
      //   scheme: 'bolt',
      //   host: '127.0.0.1',
      //   port: 7687,
      //   username: 'neo4j',
      //   password: 'neo',
      // }),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
        ]), forwardRef(() => CommunityModule)
      ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
