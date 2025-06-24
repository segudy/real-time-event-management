// backend/core-service/src/events/events.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event, EventSchema } from './schemas/event.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema }
    ]),
    HttpModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}