import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Character, CharacterDocument } from './character.schema'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'
import { GetCharactersQuery } from './dto/get-characters-query.dto'

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const check = await this.characterModel
      .findOne({ name: createCharacterDto.name })
      .exec()
    if (check) {
      console.log(`Character exists with id:${check.id} & name:${check.name}`)
      throw new ConflictException(`Character exists with id:${check.id}`)
    }

    const newCharacter = await this.characterModel.create(createCharacterDto)

    const res = await newCharacter.save()
    console.log(`Created character with id:${res.id}`)

    return res
  }

  async findAll(queries: GetCharactersQuery): Promise<Character[]> {
    const dbQuery = this.characterModel.find()

    if (queries.name) {
      dbQuery.where('name', queries.name)
    }

    if (queries.wikiUrl) {
      dbQuery.where('wikiUrl', queries.wikiUrl)
    }

    const characters = await dbQuery.exec()
    if (!characters || !characters.length) {
      throw new NotFoundException('Characters not found')
    }

    return characters
  }

  async findOne(characterId: string): Promise<Character> {
    const character = await this.characterModel
      .findOne({ id: characterId })
      .exec()
    if (!character) {
      throw new NotFoundException('Character not found')
    }

    return character
  }

  async update(
    characterId: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.characterModel
      .findOne({ id: characterId })
      .exec()
    if (!character) {
      throw new NotFoundException('Character not found')
    }

    const res = await this.characterModel
      .updateOne({ id: characterId }, updateCharacterDto)
      .exec()
    console.log(
      `Updated ${res.modifiedCount} character with id:${character.id}`,
    )

    return character
  }

  async removeAll(): Promise<Character[]> {
    const characters = await this.characterModel.find().exec()
    if (!characters || !characters.length) {
      throw new NotFoundException('Characters not found')
    }

    await Promise.all(
      characters.map(async character => {
        return this.remove(character.id)
      }),
    )

    console.log(`Deleted ${characters.length} characters`)

    return characters
  }

  async remove(characterId: string): Promise<Character> {
    const character = await this.characterModel
      .findOne({ id: characterId })
      .exec()
    if (!character) {
      throw new NotFoundException('Character not found')
    }

    const res = await this.characterModel.deleteOne({ id: characterId }).exec()
    console.log(`Deleted ${res.deletedCount} character with id:${character.id}`)

    return character
  }
}
