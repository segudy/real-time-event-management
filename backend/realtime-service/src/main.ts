// backend/realtime-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketServer } from 'ws';
import { EventsGateway } from './gateways/events.gateway'; // Gateway importieren

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = await app.listen(3002, 'localhost');

  // Erstellt den WebSocket-Server
  const wss = new WebSocketServer({ server });

  // Erstellt eine Instanz unseres Gateways und übergibt den Server
  new EventsGateway(wss);
}
bootstrap();