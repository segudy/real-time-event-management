// frontend/src/app/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Hole den AuthService
  const authService = inject(AuthService);
  // Hole die aktuelle Rolle aus dem localStorage
  const userRole = authService.getUserRole();

  // Wenn eine Rolle vorhanden ist, füge sie zum Header hinzu
  if (userRole) {
    // Klone die Anfrage und füge den neuen Header hinzu
    const clonedRequest = req.clone({
      setHeaders: {
        'x-user-role': userRole,
      },
    });
    // Sende die geklonte Anfrage weiter
    return next(clonedRequest);
  }

  // Wenn keine Rolle vorhanden ist, sende die Original-Anfrage weiter
  return next(req);
};