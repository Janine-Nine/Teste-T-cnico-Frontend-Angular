import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserApiService } from './user-api.service';

@Component({
  selector: 'app-busca',
  template: ''
})
export class Componente {

  search = new FormControl('');
  loading = signal(false);

  users$ = this.search.valueChanges.pipe(
    debounceTime(500),
    switchMap(value => {
      this.loading.set(true);
      return this.api.getUsers(value).pipe(
        finalize(() => this.loading.set(false)),
        catchError(() => of([]))
      );
    })
  );

  constructor(private api: UserApiService) {}
}
