import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { <%= classify(name) %>Controller } from './<%= name %>.controller'
import { <%= classify(name) %>Service } from './<%= name %>.service'
import { <%= singular(classify(name)) %>, <%= singular(classify(name)) %>Schema } from './<%= singular(name) %>.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: <%= singular(classify(name)) %>.name,
        schema: <%= singular(classify(name)) %>Schema,
      },
    ]),
  ],
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}
