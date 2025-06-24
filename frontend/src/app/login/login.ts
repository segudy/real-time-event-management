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
          alert('Login erfolgreich!');
          // Bei Erfolg zur Event-Liste navigieren
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Fehler beim Login:', err);
          alert('Login fehlgeschlagen! (Siehe Konsole für Details)');
        },
      });
    }
  }
}