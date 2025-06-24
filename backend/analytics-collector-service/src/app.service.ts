// backend/analytics-collector-service/src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Nimmt Tracking-Daten entgegen und loggt sie
  trackData(data: any) {
    console.log('[Analytics-Service] Daten empfangen:', data);
    return { message: 'Daten erfolgreich empfangen', receivedData: data };
  }
}