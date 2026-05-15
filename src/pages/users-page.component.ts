import { Component, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { UserService } from '../data-access/user.service';
import { Page } from '../data-access/page.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  templateUrl: './users-page.component.html'
})
export class UsersPageComponent {

  private service = inject(UserService);

  search = new FormControl('');
  page = signal(0);
  size = signal(5);

  response = signal<Page<any> | null>(null);
  loading = signal(false);

  ngOnInit() {
    this.load();

    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.page.set(0);
      this.load();
    });
  }

  load() {
    this.loading.set(true);

    this.service.getUsers({
      page: this.page(),
      size: this.size(),
      search: this.search.value || ''
    }).subscribe(res => {
      this.response.set(res);
      this.loading.set(false);
    });
  }

  nextPage() {
    if (this.page() < (this.response()?.totalPages ?? 0) - 1) {
      this.page.update(p => p + 1);
      this.load();
    }
  }

  prevPage() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
      this.load();
    }
  }
}
