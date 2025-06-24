// backend/realtime-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketServer } from 'ws';
import { EventsGateway } from './gateways/events.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = await app.listen(3002, 'localhost');
  const wss = new WebSocketServer({ server });

  // Die von NestJS erstellte Gateway-Instanz abrufen
  const eventsGateway = app.get(EventsGateway);
  // Unsere neue Methode aufrufen, um den Server zu übergeben
  eventsGateway.initialize(wss);
}
bootstrap();