// backend/core-service/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Platzhalter Login
  login(loginData: any) {
    console.log('Login-Anfrage im Backend erhalten:', loginData);
    
    // Hier sollte die Logik für die Authentifizierung implementiert werden.
    return {
      message: 'Login erfolgreich (Platzhalter)',
      userId: 'user-placeholder-123',
      token: 'jwt-placeholder-token',
    };
  }
}