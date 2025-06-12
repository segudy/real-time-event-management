// backend/core-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    EventsModule,
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost:27017/event-management-db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}