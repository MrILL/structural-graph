import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Event, EventDocument, EventRequirementType } from './event.schema'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { GetEventsQuery } from './dto/get-events-query.dto'

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

    if (createEventDto.requirements) {
      createEventDto.requirements.forEach(requirement => {
        const { eventType, value, eventId, characterId } = requirement
        switch (requirement.eventType) {
          case EventRequirementType.Text:
            break
          case EventRequirementType.CharacterLust:
          case EventRequirementType.CharacterAffection:
            if (!value || !characterId) {
              throw new BadRequestException(
                `Requirements: Empty 'value' || 'characterId' fields for ${eventType} type`,
              )
            }
            if (eventId) {
              throw new BadRequestException(
                `Requirements: Not expected 'eventId' field with ${eventType} type`,
              )
            }
            break
          case EventRequirementType.Event:
            if (!eventId) {
              throw new BadRequestException(
                `Requirements: Empty 'eventId' field for ${eventType} type`,
              )
            }
            if (value) {
              throw new BadRequestException(
                `Requirements: Not expected 'value' field with ${eventType} type`,
              )
            }
            if (characterId) {
              throw new BadRequestException(
                `Requirements: Not expected 'characterId' field with ${eventType} type`,
              )
            }
            break
          default:
            throw new InternalServerErrorException(
              `Requirements: Not expected event type: ${requirement.eventType}`,
            )
        }
      })
    }

    const newEvent = await this.eventModel.create(createEventDto)

    const res = await newEvent.save()
    console.log(`Created event with id:${res._id}`)

    return res
  }

  async findAll(queries: GetEventsQuery): Promise<Event[]> {
    const dbQuery = this.eventModel.find()

    if (queries.title) {
      dbQuery.where('title', queries.title)
    }

    if (queries.wikiUrl) {
      dbQuery.where('wikiUrl', queries.wikiUrl)
    }

    const events = await dbQuery.exec()
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

  async removeAll(): Promise<Event[]> {
    const events = await this.eventModel.find().exec()
    if (!events || !events.length) {
      throw new NotFoundException('Events not found')
    }

    await Promise.all(
      events.map(async event => {
        return this.remove(event._id)
      }),
    )

    console.log(`Deleted ${events.length} characters`)

    return events
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
