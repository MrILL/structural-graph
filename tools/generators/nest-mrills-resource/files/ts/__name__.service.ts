import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { <%= singular(classify(name)) %>, <%= singular(classify(name)) %>Document } from './<%= singular(name) %>.schema'
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto'
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto'

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @InjectModel(<%= singular(classify(name)) %>.name) private <%= singular(name) %>Model: Model<<%= singular(classify(name)) %>Document>,
  ) {}

  async create(create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto): Promise<<%= singular(classify(name)) %>> {
    // const check = await this.<%= singular(name) %>Model
    //  .findOne({}) //TODO
    //  .exec()
    // if (check) {
    //  console.log(`Id of already existed result ${check.id}`)
    //  throw new ConflictException(
    //    `<%= singular(classify(name)) %> exists with id:${check.id}`,
    //  )
    // }

    const new<%= singular(classify(name)) %> = await this.<%= singular(name) %>Model.create(create<%= singular(classify(name)) %>Dto)

    const res = await new<%= singular(classify(name)) %>.save()
    console.log(`Created <%= singular(name) %> with id:${res.id}`)

    return res
  }

  async findAll(): Promise<<%= singular(classify(name)) %>[]> {
    const <%= name %> = await this.<%= singular(name) %>Model.find().exec()
    if (!<%= name %> || !<%= name %>.length) {
      throw new NotFoundException('<%= classify(name) %> not found')
    }

    return <%= name %>
  }

  async findOne(<%= singular(name) %>Id: string): Promise<<%= singular(classify(name)) %>> {
    const <%= singular(name) %> = await this.<%= singular(name) %>Model.findOne({ _id: <%= singular(name) %>Id }).exec()
    if (!<%= singular(name) %>) {
      throw new NotFoundException('<%= singular(classify(name)) %> not found')
    }

    return <%= singular(name) %>
  }

  async update(
    <%= singular(name) %>Id: string,
    update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
  ): Promise<<%= singular(classify(name)) %>> {
    const <%= singular(name) %> = await this.<%= singular(name) %>Model.findOne({ _id: <%= singular(name) %>Id }).exec()
    if (!<%= singular(name) %>) {
      throw new NotFoundException('<%= singular(classify(name)) %> not found')
    }

    const res = await this.<%= singular(name) %>Model
      .updateOne({ _id: <%= singular(name) %>Id }, update<%= singular(classify(name)) %>Dto)
      .exec()
    console.log(`Updated ${res.modifiedCount} <%= singular(name) %> with id:${<%= singular(name) %>.id}`)

    return <%= singular(name) %>
  }

  async remove(<%= singular(name) %>Id: string): Promise<<%= singular(classify(name)) %>> {
    const <%= singular(name) %> = await this.<%= singular(name) %>Model.findOne({ _id: <%= singular(name) %>Id }).exec()
    if (!<%= singular(name) %>) {
      throw new NotFoundException('<%= singular(classify(name)) %> not found')
    }

    const res = await this.<%= singular(name) %>Model.deleteOne({ _id: <%= singular(name) %>Id }).exec()
    console.log(`Deleted ${res.deletedCount} <%= singular(name) %> with id:${<%= singular(name) %>.id}`)

    return <%= singular(name) %>
  }
}
