// backend/realtime-service/src/internal.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { EventsGateway } from '../gateways/events.gateway'; // <-- KORRIGIERTER PFAD

@Controller('internal') // <-- PRÄFIX HINZUGEFÜGT
export class InternalController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Post('events/new')
  handleNewEvent(@Body() eventData: any) {
    console.log(
      'Nachricht vom Core-Service im Realtime-Service erhalten:',
      eventData,
    );

    this.eventsGateway.broadcast(
      `Neues Event erstellt: ${eventData.name}`,
    );

    return { message: 'Benachrichtigung erfolgreich empfangen' };
  }
}