import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { EventDetailsService } from '../event-details/event-details.service'

import { Event, EventDocument, EventRequirementType } from './event.schema'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { GetEventsQuery } from './dto/get-events-query.dto'

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    private readonly eventDetailsService: EventDetailsService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { details, ...createDto } = createEventDto

    const check = await this.eventModel
      .findOne({
        wikiUrl: createDto.wikiUrl,
      })
      .exec()
    if (check) {
      console.log(`Id of already existed result ${check.id}`)
      throw new ConflictException(
        `Scrape result of Event page already exists with id:${check.id}`,
      )
    }

    const newEvent = Object.assign(new Event(), createEventDto)

    if (createDto.requirements) {
      createDto.requirements.forEach(requirement => {
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

    if (details) {
      const eventDetails = await this.eventDetailsService.create(details)

      newEvent.detailsId = eventDetails.id
    }

    const newEventDocument = await this.eventModel.create(newEvent)

    const res = await newEventDocument.save()
    console.log(`Created event with id:${res.id}`)

    return res
  }

  async findAll(queries: GetEventsQuery): Promise<Event[]> {
    const dbQuery = this.eventModel.find()

    if (queries.title) {
      dbQuery.where('title', { $regex: queries.title })
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
    console.log(`Updated ${res.modifiedCount} event with id:${event.id}`)

    return event
  }

  async removeAll(): Promise<Event[]> {
    const events = await this.eventModel.find().exec()
    if (!events || !events.length) {
      throw new NotFoundException('Events not found')
    }

    await Promise.all(
      events.map(async event => {
        return this.remove(event.id)
      }),
    )

    console.log(`Deleted ${events.length} characters`)

    return events
  }

  async remove(eventId: string): Promise<Event> {
    console.log(`Attemp to delete event with id:${eventId}`)

    const event = await this.eventModel.findOne({ _id: eventId }).exec()
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const res = await this.eventModel.deleteOne({ _id: eventId }).exec()
    console.log(`Deleted ${res.deletedCount} event with id:${event.id}`)

    /// "cascade"

    if (event.detailsId) {
      await this.eventDetailsService.remove(event.detailsId)
    }

    ///

    return event
  }
}
