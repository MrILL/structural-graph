import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm'

import { EVENT_DETAILS_ID_LENGTH, EVENT_ID_LENGTH } from '@sg/constants'

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

@Entity()
export class Event {
  @ObjectIdColumn()
  id: string

  @Column({ unique: true })
  title: string

  @Column({ unique: true })
  wikiUrl: string

  @Column()
  type: string //"Every Day I Grow Some More" is a Main Event. //Main Event - is a link

  @Column()
  version: string

  //////

  @Column({
    length: EVENT_DETAILS_ID_LENGTH,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventEventDetails',
  })
  detailsId?: string

  /// TODO remove after migration

  @Column()
  synopsis?: string

  @Column()
  choises?: string //Possible html

  @Column()
  criteria?: string //Possible html

  @Column()
  effects?: string

  @Column()
  trivia?: string

  @Column({ type: mongoose.Schema.Types.Map, of: String })
  manyText?: Map<string, string>

  //////

  @Column()
  location?: string //or actual location page

  //TODO replace with reference at separate table
  @Column(
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

  @Column({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  })
  activeCharacterIds?: string[]

  @Column({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  prevEventId?: string

  @Column({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  nextEventId?: string

  ///

  @Column()
  imgUrl?: string
}

export type EventDocument = Event & Document

export const EventSchema = BaseSchemaFactory.createForClass(Event)
