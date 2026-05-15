import { TelefoneMaskDirective } from 'src/app/shared/directives/telefone-mask.directive';
import {
  Directive,
  HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appTelefoneMask]',
  standalone: true
})
export class TelefoneMaskDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput() {
    const input = this.el.nativeElement;

    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    value = this.format(value);

    input.value = value;
  }

  private format(value: string): string {

    if (value.length <= 10) {
      // telefone fixo
      return value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }

    // celular
    return value
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
}
