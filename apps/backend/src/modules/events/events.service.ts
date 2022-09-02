import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'

import { EventDetailsService } from '../event-details/event-details.service'

import { Event, EventRequirementType } from './event.schema'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { GetEventsQuery } from './dto/get-events-query.dto'
import { EventsRepository } from './events.repository'

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventDetailsService: EventDetailsService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { details, ...createDto } = createEventDto

    const check = await this.eventsRepository.findOneByWikiUrl(
      createDto.wikiUrl,
    )
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

    const res = await this.eventsRepository.create(newEvent)
    console.log(`Created event with id:${res.id}`)

    return res
  }

  async findAll(queries: GetEventsQuery): Promise<Event[]> {
    const events = await this.eventsRepository.findAll(queries)
    if (!events || !events.length) {
      throw new NotFoundException('Events not found')
    }

    return events
  }

  async findOne(eventId: string): Promise<Event> {
    const event = await this.eventsRepository.findOne(eventId)
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    return event
  }

  async update(
    eventId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.eventsRepository.findOne(eventId)
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const res = await this.eventsRepository.update(eventId, updateEventDto)
    console.log(`Updated event with id:${event.id}`)

    return res
  }

  async removeAll(): Promise<Event[]> {
    const events = await this.eventsRepository.findAll()
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

    const event = await this.eventsRepository.findOne(eventId)
    if (!event) {
      throw new NotFoundException('Event not found')
    }

    const res = await this.eventsRepository.remove(eventId)
    console.log(`Deleted ${res.deletedCount} event with id:${event.id}`)

    /// "cascade"

    if (event.detailsId) {
      await this.eventDetailsService.remove(event.detailsId)
    }

    ///

    return event
  }
}
