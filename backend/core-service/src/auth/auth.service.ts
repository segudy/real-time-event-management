// backend/core-service/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Wird beim Start der Anwendung aufgerufen
  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  // Erstellt einen Standard-Admin-User falls noch keiner existiert
  private async createDefaultAdmin(): Promise<void> {
    try {
      const existingAdmin = await this.userModel.findOne({ 
        email: 'admin@admin.de' 
      }).exec();

      if (!existingAdmin) {
        const adminUser = new this.userModel({
          email: 'admin@admin.de',
          password: 'admin',
          role: UserRole.ADMIN,
          firstName: 'Admin'
        });
        await adminUser.save();
        console.log('Standard-Admin-User wurde erstellt: admin@admin.de / admin');
      }
    } catch (error) {
      console.error('Fehler beim Erstellen des Admin-Users:', error);
    }
  }

  // "Echte" Login-Logik
  async login(loginData: any): Promise<any> {
    const { email, password } = loginData;

    // Finde den User anhand der E-Mail
    const user = await this.userModel.findOne({ email }).exec();

    // Prüfe, ob User existiert und Passwort stimmt (vereinfacht!)
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }

    console.log(`User ${user.email} erfolgreich eingeloggt.`);    // Gebe die echten Daten des Users zurück
    return {
      message: 'Login erfolgreich',
      userId: user._id,
      token: 'jwt-placeholder-token-fuer-' + user._id, // Realistischerer Platzhalter
      role: user.role,
      username: this.getUserDisplayName(user),
    };
  }

  // Helper method to get display name based on user role
  private getUserDisplayName(user: User): string {
    switch (user.role) {
      case UserRole.ADMIN:
        return 'Administrator';
      case UserRole.ORGANIZER:
        return user.companyName || 'Organizer';
      case UserRole.ATTENDEE:
        return user.firstName || 'User';
      default:
        return 'User';
    }
  }

  // Speichert neuen User in der DB
  async register(registerData: any): Promise<User> {
    console.log('Registrierungs-Anfrage im Backend erhalten:', registerData);
    // In einer echten App würden wir hier das Passwort hashen
    const createdUser = new this.userModel(registerData);
    return createdUser.save();
  }

  // Admin-only: Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({}, '-password').exec(); // Exclude password field
  }
}