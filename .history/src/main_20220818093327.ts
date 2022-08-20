import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { MessagesModule } from './messages/messages.module';

const globalPrefix = '/api';
const configureSwagger = (app: INestApplication) => {
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  const baseApis = `/${appConfig.baseUrl}${globalPrefix}`;
  const baseUrl = baseApis.replace('//', '/');
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Order-service')
    .setDescription('The order-service API description')
    .setVersion('1.0.0')
    .addServer(baseUrl)
    .addBearerAuth(
      {
        type: 'apiKey',
        scheme: 'JWT',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Type into the text box: Bearer {your JWT token}',
        in: 'header',
      },
      'JWT',
    )
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, swaggerDoc);
};
async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(3000);
}
bootstrap();
