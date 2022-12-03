import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunitiesController } from './community.controller';
import { CommunitiesRepository } from './community.repository';
import { Community, CommunitySchema } from './community.schema';
import { CommunitiesService } from './community.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository],
})
export class CommunityModule {}
