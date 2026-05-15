import { Injectable, inject } from '@angular/core';
import { UserApiService } from './user-api.service';
import { PageRequest } from '../models/page-request.model';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = inject(UserApiService);
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  getUsers(params?: PageRequest) {
    const defaultParams = params || {
      page: 0,
      size: 10,
      search: ''
    };

    return this.api.getUsers(defaultParams).pipe(
      map(response => response.content),
      tap(users => this.usersSubject.next(users))
    );
  }

  searchUsers(search: string) {
    const params: PageRequest = {
      page: 0,
      size: 10,
      search
    };

    return this.api.getUsers(params).pipe(
      map(response => response.content),
      tap(users => this.usersSubject.next(users))
    );
  }

  addUser(user: User): Observable<User> {
    return this.api.addUser(user).pipe(
      tap(newUser => {
        this.usersSubject.next([...this.usersSubject.value, newUser]);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.api.updateUser(user).pipe(
      tap(updatedUser => {
        this.usersSubject.next(
          this.usersSubject.value.map(u => u.id === updatedUser.id ? updatedUser : u)
        );
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.api.deleteUser(id).pipe(
      tap(() => {
        this.usersSubject.next(this.usersSubject.value.filter(u => u.id !== id));
      })
    );
  }
}
