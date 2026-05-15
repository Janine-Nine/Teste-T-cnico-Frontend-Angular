import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {

  private users = signal<User[]>([]);
  private loading = signal(false);

  users$ = computed(() => this.users());
  loading$ = computed(() => this.loading());

  setUsers(users: User[]) {
    this.users.set(users);
  }

  setLoading(value: boolean) {
    this.loading.set(value);
  }
}
items = signal<{ nome: string; preco: number; qtd: number }[]>([]);

total = computed(() =>
  this.items().reduce((acc, item) => acc + item.preco * item.qtd, 0)
);

addItem(item) {
  this.items.update(list => [...list, item]);
}
