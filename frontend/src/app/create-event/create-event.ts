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

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.scss'],
})
export class CreateEventComponent {
  // Formular-Gruppe
  createEventForm: FormGroup;
  // Feste ID für den Veranstalter als Platzhalter
  private organizerIdPlaceholder = '684accc073e663e6f66e0ccb';

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router, // Router für die Weiterleitung
  ) {
    this.createEventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  // Submit-Methode
  onSubmit() {
    if (this.createEventForm.valid) {
      const formValue = this.createEventForm.value;
      // Füge die Platzhalter-organizerId hinzu
      const eventData = { ...formValue, organizerId: this.organizerIdPlaceholder };

      console.log('Sende Event-Daten an Backend:', eventData);
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          console.log('Event erfolgreich erstellt:', response);
          alert('Event erfolgreich erstellt!');
          this.router.navigate(['/events']); // Leite zur Event-Liste weiter
        },
        error: (err) => {
          console.error('Fehler beim Erstellen des Events:', err);
          alert('Fehler beim Erstellen des Events!');
        },
      });
    }
  }
}