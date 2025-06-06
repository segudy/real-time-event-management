// backend/core-service/src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  // Create Event
  create(createEventDto: CreateEventDto) {
    // Logik hier
    console.log('Event-Daten erhalten:', createEventDto);
    return {
      message: 'Event wurde erfolgreich entgegengenommen.',
      data: createEventDto,
    };
  }
}