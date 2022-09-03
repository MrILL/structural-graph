import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import path = require('path')

import { EventsModule } from '../events/events.module'
import { CharactersModule } from '../characters/characters.module'
import { EventDetailsModule } from '../event-details/event-details.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: await configService.get('DB_URL'),
        entities: [path.join(process.cwd(), 'src', '**/**.entity{.ts,.js}')],
        synchronize: configService.get('DB_SYNC') === 'true',
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: await configService.get('DB_URL'),
        }
      },
    }),
    EventsModule,
    CharactersModule,
    EventDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
