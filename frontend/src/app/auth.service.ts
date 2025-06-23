// frontend/src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Basis-URL für Auth-Endpunkte
  private apiUrl = '/api/auth'; // Zeigt auf den core-service

  // HttpClient injizieren
  constructor(private http: HttpClient) {}

  // Login-Anfrage senden
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Registrierungs-Anfrage (Platzhalter)
  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userInfo);
  }
}