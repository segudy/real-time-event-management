// frontend/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // withInterceptors importieren
import { routes } from './app.routes';
import { authInterceptor } from './auth-interceptor'; // Unseren Interceptor importieren

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Den HttpClient mit unserem Interceptor konfigurieren
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};