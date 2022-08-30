import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EventDetailsController } from './event-details.controller'
import { EventDetailsService } from './event-details.service'
import { EventDetails, EventDetailsSchema } from './event-detail.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventDetails.name,
        schema: EventDetailsSchema,
      },
    ]),
  ],
  controllers: [EventDetailsController],
  providers: [EventDetailsService],
})
export class EventDetailsModule {}
