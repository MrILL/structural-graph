import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

enum EventRequirementType {
  Text = 'text',
  CharacterAffection = 'char_affection',
  CharacterLust = 'char_lust',
  Event = 'event',
}

export class EventRequirement {
  eventType: EventRequirementType

  characterValue?: number

  eventId?: string
}

@Schema()
export class Event {
  @Prop()
  id: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  type: string //"Every Day I Grow Some More" is a Main Event. //Main Event - is a link

  @Prop({ required: true })
  synopsis: string

  @Prop()
  choises?: string //Possible html

  @Prop()
  criteria?: string //Possible html

  @Prop()
  effects?: string

  ///

  @Prop({ required: true })
  version: string

  @Prop()
  location?: string //or actual location page

  @Prop(
    raw({
      type: [
        {
          eventType: {
            required: true,
            type: String,
            enum: EventRequirementType,
          },
          characterValue: {
            type: mongoose.Schema.Types.Number,
          },
          eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
          },
        },
      ],
    }),
  )
  requirements?: EventRequirement[] //can be text

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  })
  activeCharacterIds?: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  prevEventId?: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  nextEventId?: string

  ///

  @Prop({ required: true, unique: true })
  wikiUrl: string

  @Prop()
  imgUrl?: string
}

export type EventDocument = Event & Document

export const EventSchema = SchemaFactory.createForClass(Event)
