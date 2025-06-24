// backend/analytics-collector-service/src/app.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Lauscht auf POST-Anfragen an /track
  @Post('track')
  trackEvent(@Body() data: any) {
    return this.appService.trackData(data);
  }
}