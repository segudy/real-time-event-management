// backend/core-service/src/events/events.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events') // Route-Präfix /events
export class EventsController {
  // Service injizieren
  constructor(private readonly eventsService: EventsService) {}

  // POST /events Route
  @Post()
  create(@Body(new ValidationPipe()) createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}