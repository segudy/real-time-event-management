// frontend/src/app/event-detail/event-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Router importieren
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss'],
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router, // Router injizieren
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.event$ = this.eventService.getEventById(eventId);
    }
  }

  // Methode zum Löschen des Events
  onDelete(id: string): void {
    // Sicherheitsabfrage
    if (confirm('Bist du sicher, dass du dieses Event löschen möchtest?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          alert('Event erfolgreich gelöscht.');
          this.router.navigate(['/events']); // Zurück zur Liste navigieren
        },
        error: (err) => {
          console.error('Fehler beim Löschen des Events:', err);
          alert('Fehler beim Löschen des Events.');
        },
      });
    }
  }
}