import { Prop, Schema, raw } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { BaseSchemaFactory } from '../../utils/BaseSchemaFactory'

export enum EventRequirementType {
  Text = 'text',
  CharacterAffection = 'char_affection',
  CharacterLust = 'char_lust',
  Event = 'event',
}

export class EventRequirement {
  eventType: EventRequirementType

  value?: string

  characterId?: string

  eventId?: string
}

@Schema()
export class Event {
  id: string

  @Prop({ required: true, unique: true })
  title: string

  @Prop({ required: true, unique: true })
  wikiUrl: string

  @Prop({ required: true })
  type: string //"Every Day I Grow Some More" is a Main Event. //Main Event - is a link

  @Prop({ required: true })
  version: string

  //////

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EventEventDetails' })
  detailsId?: string

  /// TODO remove after migration

  @Prop()
  synopsis?: string

  @Prop()
  choises?: string //Possible html

  @Prop()
  criteria?: string //Possible html

  @Prop()
  effects?: string

  @Prop()
  trivia?: string

  @Prop({ type: mongoose.Schema.Types.Map, of: String })
  manyText?: Map<string, string>

  //////

  @Prop()
  location?: string //or actual location page

  //TODO replace with reference at separate table
  @Prop(
    raw({
      type: [
        {
          eventType: {
            required: true,
            type: String,
            enum: EventRequirementType,
          },
          value: {
            type: mongoose.Schema.Types.String,
          },
          characterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character',
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

  @Prop()
  imgUrl?: string
}

export type EventDocument = Event & Document

export const EventSchema = BaseSchemaFactory.createForClass(Event)
