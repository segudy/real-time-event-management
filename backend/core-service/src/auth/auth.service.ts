// backend/core-service/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  // UserModel injizieren
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Platzhalter für Login
  login(loginData: any) {
    console.log('Login-Anfrage im Backend erhalten:', loginData);
    // Später: User in DB suchen und Passwort vergleichen
    return {
      message: 'Login erfolgreich (Platzhalter)',
      userId: 'user-placeholder-123',
      token: 'jwt-placeholder-token',
    };
  }

  // Speichert neuen User in der DB
  async register(registerData: any): Promise<User> {
    console.log('Registrierungs-Anfrage im Backend erhalten:', registerData);
    
    // Hinweis: In einer echten App würden wir hier das Passwort hashen
    const createdUser = new this.userModel(registerData);
    return createdUser.save();
  }
}