// frontend/src/app/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // URL unseres Backends
  private apiUrl = 'http://localhost:3000/events';

  // HttpClient injizieren
  constructor(private http: HttpClient) {}

  // Methode zum Abrufen der Events
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}