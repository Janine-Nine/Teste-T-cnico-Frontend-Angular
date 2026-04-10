import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function telefoneBRValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let telefone = control.value;

    if (!telefone) return null;

    // remove tudo que não for número
    telefone = telefone.replace(/\D/g, '');

    // tamanho válido: 10 (fixo) ou 11 (celular)
    if (telefone.length < 10 || telefone.length > 11) {
      return { telefoneInvalido: true };
    }

    const ddd = telefone.substring(0, 2);
    const numero = telefone.substring(2);

    // DDD válido (não começa com 0)
    if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
      return { telefoneInvalido: true };
    }

    // celular começa com 9
    if (telefone.length === 11 && !numero.startsWith('9')) {
      return { telefoneInvalido: true };
    }

    return null;
  };
}
