// backend/core-service/src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// Definiert die erlaubten Rollen
export enum UserRole {
  ATTENDEE = 'attendee',    // Privatperson
  ORGANIZER = 'organizer',  // Unternehmen
  ADMIN = 'admin',          // Administrator
}

@Schema({ timestamps: true })
export class User {
  // --- Gemeinsame Felder für alle Rollen ---
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  // --- Felder für 'attendee' (Privatperson) ---
  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ type: [String], required: false })
  interests: string[];

  // --- Felder für 'organizer' (Unternehmen) ---
  @Prop({ required: false })
  companyName: string;

  @Prop({ required: false })
  legalForm: string;

  @Prop({ required: false })
  vatId: string;

  @Prop({ required: false })
  contactPerson: string;
}

export const UserSchema = SchemaFactory.createForClass(User);