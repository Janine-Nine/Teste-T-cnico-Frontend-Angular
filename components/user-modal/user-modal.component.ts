import {
  Component,
  Inject,
  signal,
  inject
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpfValidator } from 'src/app/shared/validators/cpf.validator';
import { UserService } from '../data-access/user.service';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  templateUrl: './user-modal.component.html'
})
export class UserModalComponent {

  private fb = inject(FormBuilder);
  private service = inject(UserService);

  loading = signal(true);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, cpfValidator()]],
    telefone: ['', Validators.required],
    tipoTelefone: ['', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (this.data?.id) {
      // 🔥 simula API
      this.service.getUsers({ page: 0, size: 1 }).subscribe(res => {
        const user = res.content[0];

        this.form.patchValue(user);
        this.loading.set(false);
      });
    } else {
      this.loading.set(false);
    }
  }
}
