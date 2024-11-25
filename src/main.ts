import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  const loggingService = app.get(LoggingService);

  const document: OpenAPIObject = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  process.on('uncaughtException', (error: Error) => {
    loggingService.logError(
      `Uncaught exception has been caught: ${error.message}`,
    );

    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    const message = `Unhandled Rejection. reason: ${reason}`;

    loggingService.logError(message);

    process.exit(1);
  });

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
