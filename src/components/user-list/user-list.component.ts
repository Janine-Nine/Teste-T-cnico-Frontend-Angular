import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { ToastService } from '../../toast/toast.service';
import { LoadingBarService } from '../../core/loading-bar/loading-bar.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal(false);

  searchControl = new FormControl('');

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toast: ToastService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit(): void {

    this.loadUsers();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => {

          this.loading.set(true);
          this.loadingBar.start();

          return this.userService.searchUsers(value || '');
        }),
        catchError(() => {

          this.error.set(true);
          this.loading.set(false);
          this.loadingBar.complete();
          return of([]);
        })
      )
      .subscribe(users => {

        this.users.set(users);
        this.loading.set(false);
        this.loadingBar.complete();
      });
  }

  loadUsers() {

    this.loading.set(true);
    this.error.set(false);
    this.loadingBar.start();

    this.userService.getUsers().subscribe({
      next: users => {

        this.users.set(users);
        this.loading.set(false);
        this.loadingBar.complete();
      },
      error: () => {

        this.error.set(true);
        this.loading.set(false);
        this.loadingBar.complete();
      }
    });
  }

  openCreateModal() {

    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toast.success('Usuário criado com sucesso.');
      }
      this.loadUsers();
    });
  }

  openEditModal(user: User) {

    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toast.success('Usuário atualizado com sucesso.');
      }
      this.loadUsers();
    });
  }

  deleteUser(user: User) {
    const shouldDelete = confirm(`Excluir ${user.nome}?`);
    if (!shouldDelete) return;

    this.loadingBar.start();

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.toast.success('Usuário excluído com sucesso.');
        this.loadUsers();
      },
      error: () => {
        this.toast.error('Falha ao excluir usuário.');
        this.loadingBar.complete();
      }
    });
  }
}
