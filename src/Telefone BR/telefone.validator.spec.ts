import { telefoneBRValidator } from './telefone.validator';

describe('Telefone Validator', () => {

  const validator = telefoneBRValidator();

  it('deve aceitar celular válido', () => {
    const control = { value: '(51) 99999-9999' } as any;
    expect(validator(control)).toBeNull();
  });

  it('deve aceitar telefone fixo válido', () => {
    const control = { value: '(51) 3333-4444' } as any;
    expect(validator(control)).toBeNull();
  });

  it('deve rejeitar telefone curto', () => {
    const control = { value: '12345' } as any;
    expect(validator(control)).toEqual({ telefoneInvalido: true });
  });

  it('deve rejeitar celular sem 9', () => {
    const control = { value: '(51) 88888-9999' } as any;
    expect(validator(control)).toEqual({ telefoneInvalido: true });
  });

});
