// backend/realtime-service/src/gateways/events.gateway.ts
import { Injectable } from '@nestjs/common'; // Injectable hinzufügen
import { WebSocketServer, WebSocket } from 'ws';

@Injectable() // Gateway als injizierbarer Service markieren
export class EventsGateway {
  private wss: WebSocketServer;

  // Der Konstruktor ist jetzt leer
  constructor() {}

  // Neue Methode, um den Server zu initialisieren
  initialize(server: WebSocketServer) {
    this.wss = server;
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client verbunden (FINALE VERSION)!');
      ws.send('Willkommen vom finalen, sauberen Gateway!');

      ws.on('message', (message) => {
        this.handleMessage(ws, message);
      });
    });
  }

  private handleMessage(client: WebSocket, message: any) {
    console.log(`Nachricht im Gateway erhalten: ${message.toString()}`);
    client.send(`Gateway-Echo: ${message.toString()}`);
  }

  public broadcast(message: string) {
    if (!this.wss) {
      console.error('WebSocket Server nicht initialisiert.');
      return;
    }
    console.log(`Sende Broadcast-Nachricht: ${message}`);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}