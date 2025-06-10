// backend/core-service/src/events/events.controller.ts
import { Controller, Post, Body, ValidationPipe, Get, Param, Patch, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  // Diese Methode ist entscheidend für GET /events
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}