export class CreateEventDetailsDto {
  eventId: string

  synopsis?: string

  choises?: string

  criteria?: string

  effects?: string

  trivia?: string

  manyText?: { [key: string]: string }
}
