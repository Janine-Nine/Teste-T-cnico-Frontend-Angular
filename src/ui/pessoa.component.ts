import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  templateUrl: './pessoa.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PessoaComponent {

  texto = '';
  private cdr = inject(ChangeDetectorRef);
  private service = inject(PessoaService);

  ngOnInit() {
    this.service.buscarPorId(1).subscribe(p => {
      this.texto = `Nome: ${p.nome}`;
      this.cdr.markForCheck();
    });
  }
}
