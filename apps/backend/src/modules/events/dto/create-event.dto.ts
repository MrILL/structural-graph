import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

import { Event, EventRequirement } from '../event.schema'

export class CreateEventDto implements Omit<Event, 'id'> {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsUrl()
  wikiUrl: string

  @IsNotEmpty()
  type: string //"Every Day I Grow Some More" is a Main Event. //Main Event - is a link

  @IsNotEmpty()
  version: string

  ///

  @IsOptional()
  synopsis?: string

  @IsOptional()
  choises?: string

  @IsOptional()
  criteria?: string

  @IsOptional()
  effects?: string

  @IsOptional()
  trivia?: string

  @IsOptional()
  manyText?: Map<string, string>

  ///

  @IsOptional()
  location?: string //or actual location page

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EventRequirement)
  requirements?: EventRequirement[] //can be text

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  activeCharacterIds?: string[]

  @IsOptional()
  prevEventId?: string

  @IsOptional()
  nextEventId?: string

  ///

  @IsOptional()
  @IsUrl()
  imgUrl?: string
}
