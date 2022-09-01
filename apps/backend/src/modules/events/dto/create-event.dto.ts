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
import { CreateEventDetailsDto } from '../../event-details/dto/create-event-detail.dto'

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
  @ValidateNested()
  @Type(() => CreateEventDetailsDto)
  details?: CreateEventDetailsDto

  //TODO remove
  @IsOptional()
  synopsis?: string

  //TODO remove
  @IsOptional()
  choises?: string

  //TODO remove
  @IsOptional()
  criteria?: string

  //TODO remove
  @IsOptional()
  effects?: string

  //TODO remove
  @IsOptional()
  trivia?: string

  //TODO remove
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
