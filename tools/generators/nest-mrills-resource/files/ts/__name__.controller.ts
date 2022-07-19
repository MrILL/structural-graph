import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { <%= classify(name) %>Service } from './<%= name %>.service'
import { <%= singular(classify(name)) %> } from './<%= singular(name) %>.schema'
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto'
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto'

@Controller('<%= name %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= name %>Service: <%= classify(name) %>Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto): Promise<<%= singular(classify(name)) %>> {
    return this.<%= name %>Service.create(create<%= singular(classify(name)) %>Dto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<<%= singular(classify(name)) %>[]> {
    return this.<%= name %>Service.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') <%= singular(name) %>Id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= name %>Service.findOne(<%= singular(name) %>Id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') <%= singular(name) %>Id: string,
    @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
  ): Promise<void> {
    await this.<%= name %>Service.update(<%= singular(name) %>Id, update<%= singular(classify(name)) %>Dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') <%= singular(name) %>Id: string): Promise<void> {
    await this.<%= name %>Service.remove(<%= singular(name) %>Id)
  }
}
