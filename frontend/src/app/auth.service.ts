// frontend/src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  public readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  public getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }
  
  // Gibt die ID des eingeloggten Nutzers zurück
  public getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('user_role', response.role);
          // Speichert jetzt auch die userId
          localStorage.setItem('userId', response.userId); 
          this._isLoggedIn$.next(true);
        }
      })
    );
  }

  public logout(): void {
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  public register(userInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userInfo);
  }
}