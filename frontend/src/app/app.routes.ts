// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  // Route für die Event-Liste
  { path: 'events', component: EventListComponent },

  // Route für unsere Login-Seite
  { path: 'login', component: LoginComponent },

  // Standard-Route (optional, leitet auf /events um)
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];