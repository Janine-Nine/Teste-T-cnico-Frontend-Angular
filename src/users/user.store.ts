import { Injectable, signal, computed, inject } from '@angular/core';
import { UserApiService } from './user-api.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {

  private api = inject(UserApiService);

  private users = signal<any[]>([]);
  private loading = signal(false);

  users$ = this.users.asReadonly();
  loading$ = this.loading.asReadonly();

  totalUsers = computed(() => this.users().length);

  loadUsers() {
    this.loading.set(true);

    this.api.getUsers().subscribe({
      next: (res) => {
        this.users.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
