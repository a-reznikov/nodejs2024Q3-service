import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document: OpenAPIObject = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();