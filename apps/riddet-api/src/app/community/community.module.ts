import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunitiesController } from './controllers/community.controller';
import { CommunitiesRepository } from './repositories/community.repository';
import { Community, CommunitySchema } from './schemas/community.schema';
import { CommunitiesService } from './services/community.service';

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
