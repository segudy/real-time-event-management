// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list'; // <-- Korrigierter Pfad

export const routes: Routes = [
  { path: 'events', component: EventListComponent },
];