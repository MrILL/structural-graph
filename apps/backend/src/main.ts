import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './modules/app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors()

  const configService = app.get(ConfigService)
  const port = configService.get('PORT') || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`)
}

bootstrap()
