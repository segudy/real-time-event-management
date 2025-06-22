// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { CreateEventComponent } from './create-event/create-event';
import { EventDetailComponent } from './event-detail/event-detail';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Spezifische 'events'-Route zuerst
  { path: 'events/new', component: CreateEventComponent },

  // Route mit Parameter :id 
  { path: 'events/:id', component: EventDetailComponent },

  // Allgemeine 'events'-Route danach
  { path: 'events', component: EventListComponent },
  
  // Standard-Route
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];