// frontend/src/app/edit-event/edit-event.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-event.html',
  styleUrls: ['./edit-event.scss'],
})
export class EditEventComponent implements OnInit {
  editEventForm!: FormGroup;
  eventId!: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    // 1. Event-ID aus der URL holen
    this.eventId = this.route.snapshot.paramMap.get('id')!;

    // 2. Formular-Struktur definieren
    this.editEventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });

    // 3. Bestehende Event-Daten abrufen und Formular füllen
    this.eventService.getEventById(this.eventId).subscribe((event) => {
      // Datum für <input type="datetime-local"> korrekt formatieren
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toISOString().substring(0, 16);
      
      this.editEventForm.patchValue({ ...event, date: formattedDate });
    });
  }

  onSubmit() {
    if (this.editEventForm.valid) {
      this.eventService
        .updateEvent(this.eventId, this.editEventForm.value)
        .subscribe({
          next: () => {
            this.toastService.success(
              'Alle Änderungen wurden erfolgreich gespeichert.',
              'Event aktualisiert!'
            );
            setTimeout(() => {
              this.router.navigate(['/events', this.eventId]); // Zurück zur Detail-Seite
            }, 1500);
          },
          error: (err) => {
            console.error('Fehler beim Aktualisieren des Events:', err);
            this.toastService.error(
              'Beim Speichern der Änderungen ist ein Fehler aufgetreten.',
              'Aktualisierung fehlgeschlagen'
            );
          }
        });
    }
  }
}