// backend/core-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Wichtig
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    // Globale DB Verbindung für die ganze App
    MongooseModule.forRoot('mongodb://localhost:27017/event-management-db'),
    // Import unseres Feature-Moduls
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}