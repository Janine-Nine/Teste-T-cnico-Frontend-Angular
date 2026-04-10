import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { USERS_REAL } from '../pages/users.real';
import { Page } from '../pages/page.model';
import { PageRequest } from '../models/page-request.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {

  private data: User[] = [...USERS_REAL];

  getUsers(params: PageRequest) {

    let data = [...this.data];

    if (params.search) {
      data = data.filter((u: User) =>
        u.nome.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    const total = data.length;
    const start = params.page * params.size;
    const end = start + params.size;

    const content = data.slice(start, end);

    const response: Page<any> = {
      content,
      totalElements: total,
      totalPages: Math.ceil(total / params.size),
      page: params.page,
      size: params.size
    };

    return of(response).pipe(delay(500));
  }

  addUser(user: User) {
    const newUser: User = {
      ...user,
      id: this.data.length ? Math.max(...this.data.map(item => item.id)) + 1 : 1
    };

    this.data = [...this.data, newUser];
    return of(newUser).pipe(delay(500));
  }

  updateUser(user: User) {
    this.data = this.data.map(item => item.id === user.id ? user : item);
    return of(user).pipe(delay(500));
  }

  deleteUser(id: number) {
    this.data = this.data.filter(item => item.id !== id);
    return of(void 0).pipe(delay(500));
  }
}
