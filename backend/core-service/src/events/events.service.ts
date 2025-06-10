// backend/core-service/src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  // Create Event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  // Find all Events
  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  // Find one Event
  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  // Update Event
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const existingEvent = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
    if (!existingEvent) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return existingEvent;
  }

  // Remove Event
  async remove(id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deletedEvent) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return deletedEvent;
  }
}