import { TestBed } from '@angular/core/testing';
import { cpfJaCadastradoValidator } from './cpf-async.validator';
import { UserApiService } from 'src/app/features/users/data-access/user-api.service';
import { of } from 'rxjs';

describe('CPF Async Validator', () => {

  let apiMock: any;

  beforeEach(() => {
    apiMock = {
      checkCpfExists: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserApiService, useValue: apiMock }
      ]
    });
  });

  it('deve retornar erro se CPF já existe', (done) => {

    apiMock.checkCpfExists.mockReturnValue(of(true));

    const validator = cpfJaCadastradoValidator();

    validator({ value: '12345678909' } as any).subscribe(result => {
      expect(result).toEqual({ cpfDuplicado: true });
      done();
    });
  });

  it('deve retornar null se CPF não existe', (done) => {

    apiMock.checkCpfExists.mockReturnValue(of(false));

    const validator = cpfJaCadastradoValidator();

    validator({ value: '52998224725' } as any).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it.each([
  ['52998224725', true],
  ['12345678900', false]
])('valida CPF %s', (cpf, esperado) => {
  const result = validator({ value: cpf } as any);
  expect(result === null).toBe(esperado);
});

});
