import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { EventsModule } from '../events/events.module'
import { CharactersModule } from '../characters/characters.module'
import { EventDetailsModule } from '../event-details/event-details.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
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
