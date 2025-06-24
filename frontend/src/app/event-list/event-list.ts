// frontend/src/app/event-list/event-list.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.scss'],
})
export class EventListComponent implements OnInit {
  events$!: Observable<any[]>;
  dropdownOpen = false;
  deleteConfirmationPending = false;

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }
  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Prevent event bubbling
    this.dropdownOpen = !this.dropdownOpen;
    console.log('Dropdown toggled:', this.dropdownOpen);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.admin-dropdown');
    
    // Only close if click is outside the dropdown
    if (!dropdown && this.dropdownOpen) {
      this.dropdownOpen = false;
      console.log('Dropdown closed by outside click');
    }
  }  // Admin-only: Delete all events
  onDeleteAll(): void {
    this.dropdownOpen = false; // Close dropdown
    
    if (!this.deleteConfirmationPending) {
      // First click - show warning and set confirmation pending
      this.deleteConfirmationPending = true;
      this.toastService.warning(
        'Klicken Sie erneut auf "Alle Events löschen" um zu bestätigen.',
        'Bestätigung erforderlich',
        {
          duration: 5000
        }
      );
      
      // Reset confirmation after 6 seconds
      setTimeout(() => {
        this.deleteConfirmationPending = false;
      }, 6000);
    } else {
      // Second click - execute deletion
      this.deleteConfirmationPending = false;
      this.executeDeleteAll();
    }
  }

  // Execute the actual deletion
  private executeDeleteAll(): void {
    this.eventService.deleteAllEvents().subscribe({
      next: (response) => {
        this.toastService.success(
          `${response.deletedCount} Events wurden erfolgreich entfernt.`,
          'Alle Events gelöscht'
        );
        this.events$ = this.eventService.getEvents(); // Refresh the list
      },
      error: (err) => {
        console.error('Fehler beim Löschen aller Events:', err);
        this.toastService.error(
          'Beim Löschen der Events ist ein Fehler aufgetreten.',
          'Löschvorgang fehlgeschlagen'
        );
      },
    });
  }

  // Admin-only: Create 25 random events for testing
  onCreateRandomEvents(): void {
    this.dropdownOpen = false; // Close dropdown
    
    this.toastService.info(
      'Erstelle 25 zufällige Events...',
      'Demo Events werden erstellt'
    );

    this.eventService.createRandomEvents().subscribe({
      next: (response) => {
        this.toastService.success(
          `${response.createdCount} zufällige Events wurden erfolgreich erstellt.`,
          'Demo Events erstellt'
        );
        this.events$ = this.eventService.getEvents(); // Refresh the list
      },
      error: (err) => {
        console.error('Fehler beim Erstellen der zufälligen Events:', err);
        this.toastService.error(
          'Beim Erstellen der Demo Events ist ein Fehler aufgetreten.',
          'Erstellung fehlgeschlagen'
        );
      },
    });
  }

  // Demo method to show different toast types (can be removed in production)
  showToastDemo(type: 'success' | 'error' | 'warning' | 'info') {
    switch (type) {
      case 'success':
        this.toastService.success('Operation completed successfully!', 'Success');
        break;
      case 'error':
        this.toastService.error('Something went wrong. Please try again.', 'Error');
        break;
      case 'warning':
        this.toastService.warning('Please check your input before proceeding.', 'Warning');
        break;
      case 'info':
        this.toastService.info('Here is some helpful information.', 'Info');
        break;
    }
  }
}