import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private counter = 0;

  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info') {
    const id = ++this.counter;

    this.toasts.update(list => [...list, { id, message, type }]);

    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }
}
