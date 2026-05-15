import { inject } from '@angular/core';
import { UsersStore } from '../data-access/user.store';

export class UsersPage {
  private store = inject(UsersStore);

  load() {
    this.store.loadUsers();
  }
}
