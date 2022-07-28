import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { GameCharacter, GameEvent, Id } from '@sg/types'

@Schema()
export class Character implements GameCharacter {
  @Prop({ type: String })
  id: Id

  @Prop({ required: true, unique: true })
  name: string

  ///

  @Prop()
  age?: string

  @Prop()
  type?: string

  @Prop({ type: mongoose.Schema.Types.Map, of: String })
  additionalInfo?: Map<string, string>

  ///

  @Prop()
  background?: string

  @Prop()
  characteristics?: string

  @Prop({ type: mongoose.Schema.Types.Map, of: String })
  relationships?: Map<string, string>

  @Prop([String])
  quotes?: string[]

  @Prop([String])
  trivia?: string[]

  ///

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  firstEvent?: GameEvent

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  lastEvent?: GameEvent
}

export type CharacterDocument = Character & Document

export const CharacterSchema = SchemaFactory.createForClass(Character)
