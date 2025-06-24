// frontend/src/app/create-event/create-event.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service'; // AuthService importieren

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.scss'],
})
export class CreateEventComponent {
  createEventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private authService: AuthService, // AuthService injizieren
    private router: Router,
  ) {
    this.createEventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createEventForm.valid) {
      // Echte User-ID vom AuthService holen
      const currentUserId = this.authService.getUserId();

      if (!currentUserId) {
        alert('Fehler: Nicht eingeloggt oder keine User-ID gefunden.');
        return; // Aktion abbrechen
      }

      const formValue = this.createEventForm.value;
      // Die echte ID statt des Platzhalters verwenden
      const eventData = { ...formValue, organizerId: currentUserId };

      console.log('Sende Event-Daten an Backend:', eventData);
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          console.log('Event erfolgreich erstellt:', response);
          alert('Event erfolgreich erstellt!');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Fehler beim Erstellen des Events:', err);
          alert('Fehler beim Erstellen des Events!');
        },
      });
    }
  }
}