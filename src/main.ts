import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  const document: OpenAPIObject = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
