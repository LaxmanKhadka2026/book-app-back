import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

export default async function handler(req, res) {
  const server = await NestFactory.create(AppModule);
  server.enableCors();
  const app = server.getHttpAdapter().getInstance();
  await app.init();

  const handler = app.getRequestHandler();
  const result = await handler(req, res);

  await app.close();
  return result;
}
