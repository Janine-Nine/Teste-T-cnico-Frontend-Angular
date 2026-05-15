import { cpfValidator } from './cpf.validator';

describe('CPF Validator', () => {

  const validator = cpfValidator();

  it('deve aceitar CPF válido', () => {
    const control = { value: '52998224725' } as any;
    expect(validator(control)).toBeNull();
  });

  it('deve rejeitar CPF inválido', () => {
    const control = { value: '12345678900' } as any;
    expect(validator(control)).toEqual({ cpfInvalido: true });
  });

  it('deve rejeitar CPF com números repetidos', () => {
    const control = { value: '11111111111' } as any;
    expect(validator(control)).toEqual({ cpfInvalido: true });
  });

  it('deve aceitar CPF vazio (campo opcional)', () => {
    const control = { value: '' } as any;
    expect(validator(control)).toBeNull();
  });

});
