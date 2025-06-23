// backend/core-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventsModule,
    HttpModule,
    AuthModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/event-management-db',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}