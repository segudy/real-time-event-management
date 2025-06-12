// backend/realtime-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './gateways/events.gateway';
import { InternalController } from './internal/internal.controller';

@Module({
  imports: [],
  controllers: [AppController, InternalController],
  // Wichtig: Gateway muss hier stehen, damit es injiziert werden kann
  providers: [AppService, EventsGateway],
})
export class AppModule {}