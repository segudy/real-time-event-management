// frontend/src/app/event-detail/event-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // RouterModule importieren
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // RouterModule HIER hinzufügen
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss'],
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.event$ = this.eventService.getEventById(eventId);
    }
  }

  onDelete(id: string): void {
    if (confirm('Bist du sicher, dass du dieses Event löschen möchtest?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          alert('Event erfolgreich gelöscht.');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Fehler beim Löschen des Events:', err);
          alert('Fehler beim Löschen des Events.');
        },
      });
    }
  }
}