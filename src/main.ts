import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(process.env.APP_DESCRIPTION)
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth()
    .addServer(
      process.env.USE_PROTOCOL ? process.env.USE_PROTOCOL + '://' : 'http://',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT, () => {
    console.info('== Listening on port ' + process.env.APP_PORT);
  });
}
bootstrap();
