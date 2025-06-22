// backend/core-service/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Platzhalter Login
  login(loginData: any) {
    console.log('Login-Anfrage im Backend erhalten:', loginData);
    return {
      message: 'Login erfolgreich (Platzhalter)',
      userId: 'user-placeholder-123',
      token: 'jwt-placeholder-token',
    };
  }

  // Platzhalter Registrierung
  register(registerData: any) {
    console.log('Registrierungs-Anfrage im Backend erhalten:', registerData);
    return {
      message: 'Registrierung erfolgreich (Platzhalter)',
      userId: 'new-user-placeholder-456',
    };
  }
}