// frontend/src/app/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Methode zum Erstellen eines neuen Events
  createEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }

  // Methode zum Abrufen eines einzelnen Events
  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Methode zum Löschen eines Events
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Methode zum Aktualisieren eines Events
  updateEvent(id: string, eventData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, eventData);
  }

  // Admin-only: Methode zum Löschen aller Events
  deleteAllEvents(): Observable<{ deletedCount: number }> {
    return this.http.delete<{ deletedCount: number }>(this.apiUrl);
  }

  // Admin-only: Methode zum Erstellen von 25 zufälligen Events
  createRandomEvents(): Observable<{ createdCount: number }> {
    return this.http.post<{ createdCount: number }>(`${this.apiUrl}/bulk/random`, {});
  }
}