import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addToast(toast: Omit<Toast, 'id'>): void {
    const newToast: Toast = {
      ...toast,
      id: this.generateId(),
      duration: toast.duration ?? 4000
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, newToast]);    // Auto-remove toast after duration (unless persistent)
    if (!newToast.persistent && newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, newToast.duration);
    }
  }

  public removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(toast => toast.id !== id));
  }

  public success(message: string, title?: string, options?: Partial<Toast>): void {
    this.addToast({
      type: 'success',
      title,
      message,
      ...options
    });
  }

  public error(message: string, title?: string, options?: Partial<Toast>): void {
    this.addToast({
      type: 'error',
      title,
      message,
      duration: 6000, // Errors stay longer by default
      ...options
    });
  }

  public warning(message: string, title?: string, options?: Partial<Toast>): void {
    this.addToast({
      type: 'warning',
      title,
      message,
      ...options
    });
  }

  public info(message: string, title?: string, options?: Partial<Toast>): void {
    this.addToast({
      type: 'info',
      title,
      message,
      ...options
    });
  }

  public clear(): void {
    this.toastsSubject.next([]);
  }
}
