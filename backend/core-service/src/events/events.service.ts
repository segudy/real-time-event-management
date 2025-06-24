// backend/core-service/src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './schemas/event.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EventsService {
  private readonly realtimeServiceUrl = 'http://realtime-service:3002';
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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

  // Admin-only: Delete all events
  async removeAll(): Promise<{ deletedCount: number }> {
    const result = await this.eventModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount };
  }
  // Admin-only: Create 25 random events for testing
  async createRandomEvents(): Promise<{ createdCount: number }> {
    try {
      // Find an admin user to use as organizer
      let adminUser = await this.userModel.findOne({ role: 'admin' }).exec();
      
      // If no admin user exists, create a default one for demo purposes
      if (!adminUser) {
        const defaultAdmin = new this.userModel({
          email: 'admin@demo.com',
          password: 'hashed_password_placeholder',
          role: 'admin',
          firstName: 'Demo',
          lastName: 'Admin'
        });
        adminUser = await defaultAdmin.save();
      }

      const randomEvents = this.generateRandomEvents(25, adminUser._id.toString());
      const createdEvents = await this.eventModel.insertMany(randomEvents);
      
      // Notify realtime service for each event (optional, may cause performance issues with many events)
      // We'll skip individual notifications for bulk creation to avoid overwhelming the system
      
      return { createdCount: createdEvents.length };
    } catch (error) {
      console.error('Error creating random events:', error);
      throw error;
    }
  }
  // Helper method to generate random events
  private generateRandomEvents(count: number, organizerId: string): CreateEventDto[] {
    const eventNames = [
      'Tech Conference 2025', 'Startup Pitch Night', 'AI & Machine Learning Summit',
      'Digital Marketing Workshop', 'Developer Meetup', 'Innovation Festival',
      'Cyber Security Conference', 'Data Science Bootcamp', 'UX/UI Design Workshop',
      'Blockchain Summit', 'Cloud Computing Conference', 'Mobile Dev Meetup',
      'Web Development Workshop', 'Gaming Convention', 'VR/AR Experience',
      'Robotics Showcase', 'Smart City Forum', 'Fintech Innovation Day',
      'E-Commerce Summit', 'IoT Conference', 'Quantum Computing Talk',
      'Digital Transformation Summit', 'Agile Methodology Workshop', 'DevOps Meetup',
      'Open Source Community Day', 'Tech Career Fair', 'Women in Tech Summit',
      'Youth Coding Bootcamp', 'Enterprise Software Demo', 'Product Launch Event',
      'Networking Breakfast', 'Innovation Lab Tour', 'Mentorship Meetup',
      'Code Review Session', 'Hackathon Weekend', 'Tech Talk Series'
    ];

    const locations = [
      'Berlin Tech Hub', 'München Innovation Center', 'Hamburg Digital Campus',
      'Frankfurt Business Center', 'Köln Startup Space', 'Stuttgart Tech Park',
      'Düsseldorf Convention Center', 'Leipzig Innovation Lab', 'Dresden Tech Tower',
      'Hannover Digital Plaza', 'Nürnberg Tech Center', 'Essen Innovation Hub',
      'Dortmund Startup Campus', 'Bremen Digital Space', 'Karlsruhe Tech Valley',
      'Wiesbaden Business Park', 'Augsburg Innovation Center', 'Bielefeld Tech Hub',
      'Bonn Digital Campus', 'Mannheim Startup Center', 'Online Event Platform',
      'Virtual Conference Room', 'Remote Webinar Space', 'Digital Meetup Room'
    ];

    const descriptions = [
      'Ein spannender Event für alle Tech-Enthusiasten und Fachexperten.',
      'Vernetzen Sie sich mit Gleichgesinnten und tauschen Sie Ideen aus.',
      'Lernen Sie die neuesten Trends und Technologien kennen.',
      'Erweitern Sie Ihre Fähigkeiten in einem interaktiven Workshop.',
      'Entdecken Sie innovative Lösungen und inspirierende Projekte.',
      'Treffen Sie Branchenexperten und potentielle Partner.',
      'Vertiefen Sie Ihr Wissen in einer entspannten Atmosphäre.',
      'Seien Sie Teil der digitalen Transformation.',
      'Erleben Sie cutting-edge Technologie live vor Ort.',
      'Diskutieren Sie aktuelle Herausforderungen und Lösungsansätze.',
      'Perfekt für Anfänger und Fortgeschrittene geeignet.',
      'Ein Must-have Event für Ihre berufliche Entwicklung.',
      'Hands-on Experience mit den neuesten Tools und Frameworks.',
      'Intensive Lernsession mit praxisnahen Beispielen.',
      'Zukunftsweisende Vorträge von Thought Leaders.'
    ];    const events: CreateEventDto[] = [];

    for (let i = 0; i < count; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 90) + 1); // 1-90 days from now
      
      events.push({
        name: eventNames[Math.floor(Math.random() * eventNames.length)] + (i > 0 ? ` #${i + 1}` : ''),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        date: randomDate,
        location: locations[Math.floor(Math.random() * locations.length)],
        organizerId: organizerId
      });
    }

    return events;
  }
}