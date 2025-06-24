// frontend/src/app/navbar/navbar.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  // Eigenschaft nur deklarieren
  isLoggedIn$: Observable<boolean>;

  // Zuweisung erfolgt hier im Konstruktor
  constructor(public authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  // Ruft die Logout-Methode im Service auf
  logout(): void {
    this.authService.logout();
  }
}