import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';

export function cpfJaCadastradoValidator(): AsyncValidatorFn {

  return (control: AbstractControl) => {

    if (!control.value) return of(null);

    // TODO: Implementar validação async de CPF duplicado
    // Quando integrar com backend, remover este comentário e implementar

    return of(null);
  };
}
