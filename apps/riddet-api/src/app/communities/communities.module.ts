import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunitiesController } from './controllers/communities.controller';
import { CommunitiesRepository } from './repositories/communities.repository';
import { Community, CommunitySchema } from './schemas/community.schema';
import { CommunitiesService } from './services/communities.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository],
})
export class CommunitiesModule {}
