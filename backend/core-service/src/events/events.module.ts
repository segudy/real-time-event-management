// backend/core-service/src/events/events.module.ts
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController], // Controller registriert
  providers: [EventsService],   // Service registriert
})
export class EventsModule {}