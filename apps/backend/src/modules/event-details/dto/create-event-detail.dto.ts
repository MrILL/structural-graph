import { IsOptional } from 'class-validator'

export class CreateEventDetailsDto {
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
}
