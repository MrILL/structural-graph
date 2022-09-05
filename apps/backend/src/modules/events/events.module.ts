import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EventDetailsModule } from '../event-details/event-details.module'

import { EventsController } from './events.controller'
import { EventsService } from './events.service'
import { Event, EventSchema } from './event.schema'
import { EventsRepository } from './events.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
    EventDetailsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
})
export class EventsModule {}
