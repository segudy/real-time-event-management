import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    create(createEventDto: CreateEventDto): {
        message: string;
        data: CreateEventDto;
    };
}
