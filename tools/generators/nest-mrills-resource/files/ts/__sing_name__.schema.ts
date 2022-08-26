import { Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { BaseSchemaFactory } from '../../utils/BaseSchemaFactory'

@Schema()
export class <%= singular(classify(name)) %> { }

export type <%= singular(classify(name)) %>Document = <%= singular(classify(name)) %> & Document

export const <%= singular(classify(name)) %>Schema = BaseSchemaFactory.createForClass(<%= singular(classify(name)) %>)
