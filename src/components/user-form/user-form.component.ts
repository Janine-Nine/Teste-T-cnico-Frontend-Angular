import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ToastService } from '../../toast/toast.service';
import { LoadingBarService } from '../../core/loading-bar/loading-bar.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  cpfPattern = /^\d{11}$/;
  telefonePattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  form: FormGroup = this.fb.group({

    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
    telefone: ['', [Validators.required, Validators.pattern(this.telefonePattern)]],
    tipoTelefone: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private loadingBar: LoadingBarService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {

    if (data) {

      this.form.patchValue(data);
    }
  }

  save() {

    if (this.form.invalid) return;

    const user = this.form.value as User;
    this.loadingBar.start();

    const action = this.data
      ? this.userService.updateUser({ ...user, id: this.data.id })
      : this.userService.addUser(user);

    action.subscribe({
      next: () => {
        this.loadingBar.complete();
        this.toast.success(this.data ? 'Usuário atualizado com sucesso.' : 'Usuário criado com sucesso.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.loadingBar.complete();
        this.toast.error('Falha ao salvar usuário.');
      }
    });
  }
}
