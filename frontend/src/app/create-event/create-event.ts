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
import { ToastService } from '../toast.service';

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
    private toastService: ToastService,
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
        this.toastService.error(
          'Sie müssen angemeldet sein, um ein Event zu erstellen.',
          'Nicht angemeldet'
        );
        return; // Aktion abbrechen
      }

      const formValue = this.createEventForm.value;
      // Die echte ID statt des Platzhalters verwenden
      const eventData = { ...formValue, organizerId: currentUserId };

      console.log('Sende Event-Daten an Backend:', eventData);
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          console.log('Event erfolgreich erstellt:', response);
          this.toastService.success(
            'Ihr Event wurde erfolgreich erstellt und ist jetzt verfügbar.',
            'Event erstellt!'
          );
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 2000);
        },
        error: (err) => {
          console.error('Fehler beim Erstellen des Events:', err);
          this.toastService.error(
            'Beim Erstellen des Events ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
            'Erstellung fehlgeschlagen'
          );
        },
      });
    }
  }
}