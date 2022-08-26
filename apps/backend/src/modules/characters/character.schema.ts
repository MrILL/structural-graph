import { Prop, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

import { GameCharacter, GameEvent, Id } from '@sg/types'
import { BaseSchemaFactory } from '../../utils/BaseSchemaFactory'

@Schema()
export class Character implements GameCharacter {
  id: Id

  @Prop({ required: true, unique: true })
  name: string

  @Prop({ required: true, unique: true })
  wikiUrl: string

  ///

  @Prop()
  age?: string

  @Prop()
  type?: string

  @Prop({ type: mongoose.Schema.Types.Map, of: String })
  additionalInfo?: Map<string, string>

  //TODO remote image relation
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RemoteImage"})
  // remoteImgId?: string

  @Prop()
  imgUrl?: string

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
  firstEventId?: GameEvent

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  lastEventId?: GameEvent
}

export type CharacterDocument = Character & Document

export const CharacterSchema = BaseSchemaFactory.createForClass(Character)
