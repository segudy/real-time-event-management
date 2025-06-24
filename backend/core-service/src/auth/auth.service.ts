// backend/core-service/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // "Echte" Login-Logik
  async login(loginData: any): Promise<any> {
    const { email, password } = loginData;

    // Finde den User anhand der E-Mail
    const user = await this.userModel.findOne({ email }).exec();

    // Prüfe, ob User existiert und Passwort stimmt (vereinfacht!)
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }

    console.log(`User ${user.email} erfolgreich eingeloggt.`);

    // Gebe die echten Daten des Users zurück
    return {
      message: 'Login erfolgreich',
      userId: user._id,
      token: 'jwt-placeholder-token-fuer-' + user._id, // Realistischerer Platzhalter
      role: user.role,
      username: user.role === 'organizer' ? user.companyName : user.firstName,
    };
  }

  // Speichert neuen User in der DB
  async register(registerData: any): Promise<User> {
    console.log('Registrierungs-Anfrage im Backend erhalten:', registerData);
    // In einer echten App würden wir hier das Passwort hashen
    const createdUser = new this.userModel(registerData);
    return createdUser.save();
  }
}