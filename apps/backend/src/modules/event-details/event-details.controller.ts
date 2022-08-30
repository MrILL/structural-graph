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
} from '@nestjs/common'

import { EventDetailsService } from './event-details.service'
import { EventDetails } from './event-detail.schema'
import { CreateEventDetailsDto } from './dto/create-event-detail.dto'
import { UpdateEventDetailsDto } from './dto/update-event-detail.dto'

@Controller('event-details')
export class EventDetailsController {
  constructor(private readonly eventDetailsService: EventDetailsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEventDetailDto: CreateEventDetailsDto,
  ): Promise<EventDetails> {
    return this.eventDetailsService.create(createEventDetailDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<EventDetails[]> {
    return this.eventDetailsService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') eventDetailId: string): Promise<EventDetails> {
    return this.eventDetailsService.findOne(eventDetailId)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') eventDetailId: string,
    @Body() updateEventDetailDto: UpdateEventDetailsDto,
  ): Promise<void> {
    await this.eventDetailsService.update(eventDetailId, updateEventDetailDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') eventDetailId: string): Promise<void> {
    await this.eventDetailsService.remove(eventDetailId)
  }
}
