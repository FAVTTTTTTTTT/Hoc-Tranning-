import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that do not have any decorators
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  )
  app.use(cookieParser());
  app.setGlobalPrefix('api'); // Set a global prefix for all routes
  const port = configService.get('PORT') || 3000; // Default to 3000 if PORT is not set
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
