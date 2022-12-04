import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { CommunitiesController } from './community.controller';
import { Community, CommunitySchema } from './community.schema';
import { CommunitiesService } from './community.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]), CategoryModule, UserModule
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
  exports: [CommunitiesService, MongooseModule]
})
export class CommunityModule  {}
