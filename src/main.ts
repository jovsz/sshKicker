import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Command, CommandFactory, CommandRunner, Option } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  await CommandFactory.run(AppModule);
  await app.listen(3000);
  Logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
