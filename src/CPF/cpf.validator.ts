import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let cpf = control.value;

    if (!cpf) return null;

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return { cpfInvalido: true };

    // ❌ CPFs inválidos conhecidos (111..., 222...)
    if (/^(\d)\1+$/.test(cpf)) return { cpfInvalido: true };

    const calcDigito = (cpf: string, peso: number) => {
      let soma = 0;

      for (let i = 0; i < peso - 1; i++) {
        soma += parseInt(cpf.charAt(i)) * (peso - i);
      }

      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const digito1 = calcDigito(cpf, 10);
    const digito2 = calcDigito(cpf, 11);

    if (digito1 !== parseInt(cpf.charAt(9)) ||
        digito2 !== parseInt(cpf.charAt(10))) {
      return { cpfInvalido: true };
    }

    return null;
  };
}
