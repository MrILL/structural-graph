import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { GameCharacter, GameEvent, Id } from '@sg/types'

@Schema()
export class Event implements GameEvent {
  @Prop({ type: String })
  id: Id

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
  location?: string

  @Prop([String])
  requirements?: string[] //can be text

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] })
  activeCharacters?: GameCharacter[]

  @Prop({ type: String })
  prevEventId?: Id

  @Prop({ type: String })
  nextEventId?: Id

  ///

  @Prop({ required: true })
  wikiUrl: string

  @Prop()
  imgUrl?: string
}

export type EventDocument = Event & Document

export const EventSchema = SchemaFactory.createForClass(Event)
