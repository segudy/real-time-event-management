// backend/core-service/src/events/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true }) // Automatische Zeitstempel
export class Event {
  // Event Name
  @Prop({ required: true })
  name: string;

  // Event Details
  @Prop({ required: true })
  description: string;

  // Event Date
  @Prop({ required: true })
  date: Date;

  // Event Location
  @Prop({ required: true })
  location: string;

  // Organizer's ID
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  organizerId: string; // Hier speichern wir die ID des Users
}

export const EventSchema = SchemaFactory.createForClass(Event);