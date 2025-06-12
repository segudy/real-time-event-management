// backend/realtime-service/src/gateways/events.gateway.ts
import { WebSocketServer, WebSocket } from 'ws';

export class EventsGateway {
  // Nimmt den WSS Server an
  constructor(private wss: WebSocketServer) {
    this.handleConnections();
  }

  private handleConnections() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client verbunden (im sauberen Gateway)!');
      ws.send('Willkommen vom finalen, sauberen Gateway!');

      ws.on('message', (message) => {
        this.handleMessage(ws, message);
      });
    });
  }

  // Logik für Nachrichten
  private handleMessage(client: WebSocket, message: any) {
    console.log(`Nachricht im Gateway erhalten: ${message.toString()}`);
    client.send(`Gateway-Echo: ${message.toString()}`);
  }

  // Später: Methode um Nachrichten an alle zu senden
  broadcast(message: string) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}