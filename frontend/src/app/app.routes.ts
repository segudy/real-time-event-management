// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CreateEventComponent } from './create-event/create-event';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Spezifische 'events'-Route zuerst
  { path: 'events/new', component: CreateEventComponent },

  // Allgemeine 'events'-Route danach
  { path: 'events', component: EventListComponent },
  
  // Platzhalter für die zukünftige Detail-Route
  // { path: 'events/:id', component: EventDetailComponent },

  // Standard-Route
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];