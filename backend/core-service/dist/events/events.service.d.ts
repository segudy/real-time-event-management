import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './schemas/event.schema';
import { HttpService } from '@nestjs/axios';
export declare class EventsService {
    private eventModel;
    private readonly httpService;
    private readonly realtimeServiceUrl;
    constructor(eventModel: Model<EventDocument>, httpService: HttpService);
    create(createEventDto: CreateEventDto): Promise<Event>;
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<Event>;
}
