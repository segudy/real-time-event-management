// backend/core-service/src/events/events.controller.ts
import { Controller, Post, Body, ValidationPipe, Get, Param, Patch, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { AdminGuard } from '../auth/roles/admin.guard';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Admin-only endpoint to create 25 random events (must come before generic POST)
  @Post('bulk/random')
  @UseGuards(AdminGuard)
  @HttpCode(201)
  createRandomEvents() {
    return this.eventsService.createRandomEvents();
  }

  @Post()
  @UseGuards(RolesGuard)
  create(@Body(new ValidationPipe()) createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  // Admin-only endpoint to delete all events
  @Delete()
  @UseGuards(AdminGuard)
  @HttpCode(200)
  removeAll() {
    return this.eventsService.removeAll();
  }
}