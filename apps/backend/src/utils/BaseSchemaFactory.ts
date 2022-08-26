import { SchemaFactory } from '@nestjs/mongoose'
import { Type } from '@nestjs/common'
import * as mongoose from 'mongoose'

export class BaseSchemaFactory extends SchemaFactory {
  static createForClass<TClass = any, _TDeprecatedTypeArgument = any>(
    target: Type<TClass>,
  ): mongoose.Schema<TClass> {
    const schema = SchemaFactory.createForClass(target)

    schema.virtual('id').get(function () {
      return this._id.toHexString()
    })

    schema.set('toJSON', {
      virtuals: true,
    })

    return schema
  }
}
