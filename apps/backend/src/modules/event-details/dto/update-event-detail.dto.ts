import { PartialType } from '@nestjs/mapped-types'
import { CreateEventDetailsDto } from './create-event-detail.dto'

export class UpdateEventDetailsDto extends PartialType(CreateEventDetailsDto) {}
