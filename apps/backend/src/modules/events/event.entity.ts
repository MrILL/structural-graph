import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

export enum EventRequirementType {
  Text = 'text',
  CharacterAffection = 'char_affection',
  CharacterLust = 'char_lust',
  Event = 'event',
}

export class EventRequirement {
  @Column()
  eventType: EventRequirementType

  @Column()
  value?: string

  @Column()
  characterId?: string

  @Column()
  eventId?: string
}

@Entity()
export class Event {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  wikiUrl: string

  @Column()
  type: string //"Every Day I Grow Some More" is a Main Event. //Main Event - is a link

  @Column()
  version: string

  //////

  /**
   * reference to EventDetail
   */
  @Column()
  detailsId?: ObjectID

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

  @Column()
  manyText?: Map<string, string>

  //////

  @Column()
  location?: string //or actual location page

  //TODO replace with reference at separate table
  @Column()
  requirements?: EventRequirement[] //can be text

  @Column()
  activeCharacterIds?: string[]

  /**
   * reference to Event
   */
  @Column()
  prevEventId?: string

  /**
   * reference to Event
   */
  @Column()
  nextEventId?: string

  ///

  @Column()
  imgUrl?: string
}

// export type EventDocument = Event & Document

// export const EventSchema = BaseSchemaFactory.createForClass(Event)
