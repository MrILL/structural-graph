import { GameCharacter } from './GameCharacter'
import { Id } from './Id'

export type GameEvent = {
  wikiUrl: string
  imgUrl?: string

  id: Id
  title: string
  type: string //"Every Day I Grow Some More" is a Main Event. //Main Event - is a link
  synopsis: string
  choises?: string //Possible html
  criteria?: string //Possible html
  effects?: string

  version: string
  location?: string //link
  requirements?: string[] //can be text
  activeCharacters?: GameCharacter[]
  prevEventId?: Id
  nextEventId?: Id
}
