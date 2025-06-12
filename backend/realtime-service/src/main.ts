// backend/realtime-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketServer } from 'ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Server starten und die Instanz für den WebSocket-Server bekommen
  const server = await app.listen(3002, 'localhost');

  // Manuellen WebSocket-Server erstellen
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('CLIENT VERBUNDEN (MANUELLER WEG)');

    // Willkommensnachricht senden
    ws.send('Willkommen! Du bist per reinem WebSocket verbunden.');

    // Auf Nachrichten vom Client lauschen
    ws.on('message', (message) => {
      console.log('Nachricht erhalten:', message.toString());
      ws.send(`Echo: ${message.toString()}`);
    });

    ws.on('close', () => {
      console.log('Client hat Verbindung getrennt');
    });
  });
}
bootstrap();