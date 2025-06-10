// backend/core-service/src/events/events.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Wichtig
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    // Registrierung des Schemas für dieses Modul
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}