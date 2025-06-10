// backend/core-service/src/events/dto/create-event.dto.ts
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  // Event Name
  @IsString()
  @IsNotEmpty()
  name: string;

  // Event Details
  @IsString()
  @IsNotEmpty()
  description: string;

  // Event Date
  @Type(() => Date)
  @IsDate()
  date: Date;

  // Event Location
  @IsString()
  @IsNotEmpty()
  location: string;

  // Organizer's ID
  @IsString()
  @IsNotEmpty()
  organizerId: string;
}