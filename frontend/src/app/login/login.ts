// frontend/src/app/login/login.ts
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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Submit-Methode
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Sende Formulardaten an Backend:', this.loginForm.value);
      
      // AuthService wird jetzt aufgerufen
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Antwort vom Backend:', response);
          alert('Login erfolgreich! (Siehe Konsole für Details)');
        },
        error: (err) => {
          console.error('Fehler beim Login:', err);
          alert('Login fehlgeschlagen! (Siehe Konsole für Details)');
        },
      });
    } else {
      console.log('Formular ist ungültig');
    }
  }
}