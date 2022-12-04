import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { CommunitiesController } from './community.controller';
import { Community, CommunitySchema } from './community.schema';
import { CommunityService } from './community.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]), forwardRef(() => CategoryModule), forwardRef(() => UserModule),
  ],
  controllers: [CommunitiesController],
  providers: [CommunityService],
  exports: [CommunityService, MongooseModule]
})
export class CommunityModule  {}
