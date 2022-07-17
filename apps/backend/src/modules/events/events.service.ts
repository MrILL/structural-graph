import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Event, EventDocument } from './event.schema'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const check = await this.eventModel
      .findOne({
        wikiUrl: createEventDto.wikiUrl,
      })
      .exec()
    if (check) {
      console.log(`Id of already existed result ${check._id}`)
      throw new ConflictException(
        `Scrape result of Event page already exists with id:${check._id}`,
      )
    }

    const newEvent = await this.eventModel.create(createEventDto)

    const res = await newEvent.save()
    console.log(`Created event with id:${res._id}`)

    return res
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventModel.find().exec()
    if (!events || !events.length) {
      throw new NotFoundException('Events not found')
    }

    return events
  }

  async findOne(eventId: string): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: eventId }).exec()
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    return event
  }

  async update(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: eventId }).exec()
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const res = await this.eventModel
      .updateOne({ _id: eventId }, updateEventDto)
      .exec()
    console.log(`Updated ${res.modifiedCount} event with id:${event._id}`)

    return event
  }

  async remove(eventId: string): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: eventId }).exec()
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const res = await this.eventModel.deleteOne({ _id: eventId }).exec()
    console.log(`Deleted ${res.deletedCount} event with id:${event._id}`)

    return event
  }
}
