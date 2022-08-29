import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator'

import { Character } from '../character.schema'

export class CreateCharacterDto implements Omit<Character, 'id'> {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsUrl()
  wikiUrl: string

  ///

  @IsOptional()
  age?: string

  @IsOptional()
  type?: string

  @IsOptional()
  additionalInfo?: Map<string, string>

  @IsOptional()
  imgUrl?: string

  ///

  @IsOptional()
  background?: string

  @IsOptional()
  characteristics?: string

  @IsOptional()
  relationships?: Map<string, string>

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  quotes?: string[]

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  trivia?: string[]

  ///

  @IsOptional()
  firstEventId?: string

  @IsOptional()
  lastEventId?: string
}
