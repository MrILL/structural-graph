import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class <%= singular(classify(name)) %> { }

export type <%= singular(classify(name)) %>Document = <%= singular(classify(name)) %> & Document

export const <%= singular(classify(name)) %>Schema = SchemaFactory.createForClass(<%= singular(classify(name)) %>)
