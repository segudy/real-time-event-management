// frontend/src/app/event-list/event-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- NEUER IMPORT
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- HIER ERWEITERT
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss'],
})
export class EventListComponent implements OnInit {
  events$!: Observable<any[]>;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }
}