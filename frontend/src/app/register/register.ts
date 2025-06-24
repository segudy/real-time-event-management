// frontend/src/app/register/register.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';

// Definiert die Rollen-Typen für Typsicherheit
type UserRole = 'attendee' | 'organizer' | 'admin';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedRole: UserRole = 'attendee'; // Standardmäßig ist "Privatperson" ausgewählt
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    // Initialisiert das Basis-Formular mit den gemeinsamen Feldern
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    // Fügt die Felder für die anfänglich ausgewählte Rolle hinzu
    this.updateFormForRole(this.selectedRole);
  }

  // Methode zum Wechseln der Rolle, wird von den Tabs im HTML aufgerufen
  selectRole(role: UserRole): void {
    this.selectedRole = role;
    this.updateFormForRole(role);
  }

  // Private Helfer-Methode, um das Formular dynamisch anzupassen
  private updateFormForRole(role: UserRole): void {
    // Zuerst alle optionalen Felder entfernen, um sauber zu starten
    ['firstName', 'lastName', 'companyName', 'contactPerson', 'vatId', 'legalForm'].forEach(controlName => {
      this.registerForm.removeControl(controlName);
    });

    if (role === 'attendee') {
      // Felder für Privatperson hinzufügen und als Pflichtfelder markieren
      this.registerForm.addControl('firstName', this.fb.control('', Validators.required));
      this.registerForm.addControl('lastName', this.fb.control('', Validators.required));
    } else if (role === 'organizer') {
      // Felder für Unternehmen hinzufügen und als Pflichtfelder markieren
      this.registerForm.addControl('companyName', this.fb.control('', Validators.required));
      this.registerForm.addControl('contactPerson', this.fb.control('', Validators.required));
      this.registerForm.addControl('vatId', this.fb.control('', Validators.required));
      this.registerForm.addControl('legalForm', this.fb.control('')); // Optional
    }
  }

  // Submit-Methode
  onSubmit() {
    if (this.registerForm.valid) {
      // Fügt die ausgewählte Rolle zu den Formulardaten hinzu
      const finalData = {
        ...this.registerForm.value,
        role: this.selectedRole,
      };

      console.log('Sende Registrierungsdaten an Backend:', finalData);      this.authService.register(finalData).subscribe({
        next: (response) => {
          console.log('Antwort vom Backend:', response);
          this.toastService.success(
            'Ihr Account wurde erfolgreich erstellt. Sie können sich jetzt anmelden.',
            'Registrierung erfolgreich!'
          );
          setTimeout(() => {
            this.router.navigate(['/login']); // Leitet zur Login-Seite weiter
          }, 2000);
        },
        error: (err) => {
          console.error('Fehler bei der Registrierung:', err);
          this.toastService.error(
            'Bei der Registrierung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
            'Registrierung fehlgeschlagen'
          );
        },
      });
    }
  }
}