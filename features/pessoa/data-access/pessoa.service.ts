import { ChangeDetectorRef } from '@angular/core';

constructor(
  private readonly pessoaService: PessoaService,
  private readonly cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
  this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1)
    .subscribe(pessoa => {
      this.texto = `Nome: ${pessoa.nome}`;
      this.cdr.markForCheck(); // 🔥 solução
    });

  setInterval(() => this.contador++, 1000);
}
