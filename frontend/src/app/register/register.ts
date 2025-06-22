// frontend/src/app/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Submit-Methode
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(
        'Sende Registrierungsdaten an Backend:',
        this.registerForm.value,
      );
      
      // AuthService wird jetzt aufgerufen
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Antwort vom Backend:', response);
          alert('Registrierung erfolgreich! (Siehe Konsole für Details)');
        },
        error: (err) => {
          console.error('Fehler bei der Registrierung:', err);
          alert('Registrierung fehlgeschlagen! (Siehe Konsole für Details)');
        },
      });
    } else {
      console.log('Registrierungsformular ist ungültig.');
    }
  }
}