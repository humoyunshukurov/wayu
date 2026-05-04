import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const PORT = process.env.PORT ?? 3001;

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Wayu.uz API')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT);

  console.log(`\n🚀 Swagger: http://localhost:${PORT}/docs\n`);
}
bootstrap();