// frontend/src/app/event-detail/event-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Für Routen-Parameter
import { EventService } from '../event.service'; // Unseren Service importieren
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
  ) {}

  ngOnInit(): void {
    // ID aus der aktuellen URL auslesen
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      // Service aufrufen, um das spezifische Event zu laden
      this.event$ = this.eventService.getEventById(eventId);
    }
  }
}