import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common'

import { EventsService } from './events.service'
import { Event } from './event.schema'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { GetEventsQuery } from './dto/get-events-query.dto'

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() queries: GetEventsQuery): Promise<Event[]> {
    return this.eventsService.findAll(queries)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') eventId: string): Promise<Event> {
    return this.eventsService.findOne(eventId)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<void> {
    await this.eventsService.update(eventId, updateEventDto)
  }

  //TODO TMP
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll(): Promise<void> {
    await this.eventsService.removeAll()
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') eventId: string): Promise<void> {
    await this.eventsService.remove(eventId)
  }
}
