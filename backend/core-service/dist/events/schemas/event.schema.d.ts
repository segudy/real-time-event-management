import mongoose, { HydratedDocument } from 'mongoose';
export type EventDocument = HydratedDocument<Event>;
export declare class Event {
    name: string;
    description: string;
    date: Date;
    location: string;
    organizerId: string;
}
export declare const EventSchema: mongoose.Schema<Event, mongoose.Model<Event, any, any, any, mongoose.Document<unknown, any, Event, any> & Event & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Event, mongoose.Document<unknown, {}, mongoose.FlatRecord<Event>, {}> & mongoose.FlatRecord<Event> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
