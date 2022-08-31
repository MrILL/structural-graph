import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { BaseSchemaFactory } from '../../utils/BaseSchemaFactory'

@Schema()
export class EventDetails {
  id: string

  @Prop()
  synopsis?: string

  @Prop()
  choises?: string

  @Prop()
  criteria?: string

  @Prop()
  effects?: string

  @Prop()
  trivia?: string

  @Prop({ type: mongoose.Schema.Types.Map, of: String })
  manyText?: Map<string, string>
}

export type EventDetailsDocument = EventDetails & Document

export const EventDetailsSchema = BaseSchemaFactory.createForClass(EventDetails)
