// frontend/src/app/event-list/event-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss'],
})
export class EventListComponent implements OnInit {
  events$!: Observable<any[]>;

  constructor(
    private eventService: EventService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }

  // Admin-only: Delete all events
  onDeleteAll(): void {
    if (confirm('WARNUNG: Sind Sie sicher, dass Sie ALLE Events löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden!')) {
      this.eventService.deleteAllEvents().subscribe({
        next: (response) => {
          alert(`${response.deletedCount} Events erfolgreich gelöscht.`);
          this.events$ = this.eventService.getEvents(); // Refresh the list
        },
        error: (err) => {
          console.error('Fehler beim Löschen aller Events:', err);
          alert('Fehler beim Löschen der Events.');
        },
      });
    }
  }
}