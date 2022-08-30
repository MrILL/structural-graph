import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { EventDetails, EventDetailsDocument } from './event-detail.schema'
import { CreateEventDetailsDto } from './dto/create-event-detail.dto'
import { UpdateEventDetailsDto } from './dto/update-event-detail.dto'

@Injectable()
export class EventDetailsService {
  constructor(
    @InjectModel(EventDetails.name)
    private eventDetailModel: Model<EventDetailsDocument>,
  ) {}

  async create(
    createEventDetailDto: CreateEventDetailsDto,
  ): Promise<EventDetails> {
    const newEventDetail = await this.eventDetailModel.create(
      createEventDetailDto,
    )

    const res = await newEventDetail.save()
    console.log(`Created eventEetails with id:${res.id}`)

    return res
  }

  async findAll(): Promise<EventDetails[]> {
    const eventDetails = await this.eventDetailModel.find().exec()
    if (!eventDetails || !eventDetails.length) {
      throw new NotFoundException('EventDetails not found')
    }

    return eventDetails
  }

  async findOne(eventDetailId: string): Promise<EventDetails> {
    const eventDetail = await this.eventDetailModel
      .findOne({ id: eventDetailId })
      .exec()
    if (!eventDetail) {
      throw new NotFoundException('EventDetail not found')
    }

    return eventDetail
  }

  async update(
    eventDetailId: string,
    updateEventDetailDto: UpdateEventDetailsDto,
  ): Promise<EventDetails> {
    const eventDetail = await this.eventDetailModel
      .findOne({ id: eventDetailId })
      .exec()
    if (!eventDetail) {
      throw new NotFoundException('EventDetail not found')
    }

    const res = await this.eventDetailModel
      .updateOne({ id: eventDetailId }, updateEventDetailDto)
      .exec()
    console.log(
      `Updated ${res.modifiedCount} event-detail with id:${eventDetail.id}`,
    )

    return eventDetail
  }

  async remove(eventDetailId: string): Promise<EventDetails> {
    const eventDetail = await this.eventDetailModel
      .findOne({ id: eventDetailId })
      .exec()
    if (!eventDetail) {
      throw new NotFoundException('EventDetail not found')
    }

    const res = await this.eventDetailModel
      .deleteOne({ id: eventDetailId })
      .exec()
    console.log(
      `Deleted ${res.deletedCount} event-detail with id:${eventDetail.id}`,
    )

    return eventDetail
  }
}
