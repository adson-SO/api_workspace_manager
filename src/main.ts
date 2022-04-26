import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
  .setTitle('API Workspace Manager')
  .setDescription('API REST para gerenciar um negócio, permitindo cadastro de funcionários e produtos.')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
