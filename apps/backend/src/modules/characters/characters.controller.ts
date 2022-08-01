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
  Query,
} from '@nestjs/common'

import { CharactersService } from './characters.service'
import { Character } from './character.schema'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'
import { GetCharactersQuery } from './dto/get-characters-query.dto'

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<Character> {
    return this.charactersService.create(createCharacterDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() queries: GetCharactersQuery): Promise<Character[]> {
    return this.charactersService.findAll(queries)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') characterId: string): Promise<Character> {
    return this.charactersService.findOne(characterId)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') characterId: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<void> {
    await this.charactersService.update(characterId, updateCharacterDto)
  }

  //TODO TMP
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll(): Promise<void> {
    await this.charactersService.removeAll()
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') characterId: string): Promise<void> {
    await this.charactersService.remove(characterId)
  }
}
