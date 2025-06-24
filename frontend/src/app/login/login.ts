// frontend/src/app/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router'; // Router importieren
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  // Router injizieren
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Antwort vom Backend:', response);
          this.toastService.success(
            'Sie wurden erfolgreich angemeldet und werden weitergeleitet.',
            'Login erfolgreich!'
          );
          // Bei Erfolg zur Event-Liste navigieren
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 1500);
        },
        error: (err) => {
          console.error('Fehler beim Login:', err);
          this.toastService.error(
            'Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.',
            'Login fehlgeschlagen'
          );
        },
      });
    }
  }
}