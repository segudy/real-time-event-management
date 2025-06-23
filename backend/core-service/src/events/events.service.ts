// backend/core-service/src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './schemas/event.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EventsService {
  private readonly realtimeServiceUrl = 'http://realtime-service:3002';

  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    // Event erstellen
    const createdEvent = new this.eventModel(createEventDto);
    const savedEvent = await createdEvent.save();

    // Benachrichtigung senden
    this.httpService
      .post(`${this.realtimeServiceUrl}/internal/events/new`, savedEvent)
      .subscribe({
        error: (err) => {
          console.error(
            'Fehler bei Benachrichtigung:',
            err.message,
          );
        },
      });

    return savedEvent;
  }

  async findAll(): Promise<Event[]> {
    // Alle Events finden
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    // Einzelnes Event finden
    const event = await this.eventModel.findById(id).exec();
    
    // Fehlerbehandlung
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    // Event aktualisieren
    const existingEvent = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();

    // Fehlerbehandlung
    if (!existingEvent) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return existingEvent;
  }

  async remove(id: string): Promise<Event> {
    // Event entfernen
    const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();

    // Fehlerbehandlung
    if (!deletedEvent) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return deletedEvent;
  }
}