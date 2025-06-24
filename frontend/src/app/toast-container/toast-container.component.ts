import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        [class]="'toast toast-' + toast.type"
        [class.toast-hiding]="toast.id === hidingToastId"
        (click)="removeToast(toast.id)"
        [@toastAnimation]
      >
        <div class="toast-icon"></div>
        <div class="toast-content">
          <div *ngIf="toast.title" class="toast-title">{{ toast.title }}</div>
          <div class="toast-message">{{ toast.message }}</div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  hidingToastId: string | null = null;
  private subscription?: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removeToast(id: string): void {
    // Add hiding animation class
    this.hidingToastId = id;
    
    // Remove after animation completes
    setTimeout(() => {
      this.toastService.removeToast(id);
      this.hidingToastId = null;
    }, 300);
  }
}
