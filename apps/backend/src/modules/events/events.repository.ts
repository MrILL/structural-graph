import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Event, EventDocument } from './event.schema'
import { GetEventsQuery } from './dto/get-events-query.dto'
import { UpdateEventDto } from './dto/update-event.dto'

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: Omit<Event, 'id'>): Promise<Event> {
    const newEventDocument = await this.eventModel.create(createEventDto)

    const res = await newEventDocument.save()

    return res
  }

  async findAll(queries?: GetEventsQuery): Promise<Event[]> {
    const dbQuery = this.eventModel.find()

    if (queries?.title) {
      dbQuery.where('title', { $regex: queries.title })
    }

    if (queries?.wikiUrl) {
      dbQuery.where('wikiUrl', queries.wikiUrl)
    }

    const events = await dbQuery.exec()

    return events
  }

  async findOne(eventId: string): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: eventId }).exec()

    return event
  }

  async findOneByWikiUrl(wikiUrl: string): Promise<Event> {
    const event = await this.eventModel.findOne({ wikiUrl }).exec()

    return event
  }

  async update(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const updateRes = await this.eventModel
      .updateOne({ _id: eventId }, updateEventDto)
      .exec()

    const updatedEvent = await this.eventModel.findOne({ _id: eventId }).exec()

    return updatedEvent
  }

  async remove(eventId: string) {
    const res = await this.eventModel.deleteOne({ _id: eventId }).exec()

    return res
  }
}
