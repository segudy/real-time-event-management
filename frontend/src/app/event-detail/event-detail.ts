// frontend/src/app/event-detail/event-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss'],
})
export class EventDetailComponent implements OnInit {
  event$!: Observable<any>;
  
  // Wir machen den AuthService public und entfernen die alte isOrganizer-Eigenschaft
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    public authService: AuthService,
    private toastService: ToastService,
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
          this.toastService.success(
            'Das Event wurde erfolgreich entfernt.',
            'Event gelöscht'
          );
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 1500);
        },
        error: (err) => {
          console.error('Fehler beim Löschen des Events:', err);
          this.toastService.error(
            'Beim Löschen des Events ist ein Fehler aufgetreten.',
            'Löschvorgang fehlgeschlagen'
          );
        },
      });
    }
  }
}