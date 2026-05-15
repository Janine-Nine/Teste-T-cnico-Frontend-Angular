import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading">
      <p>Carregando...</p>
    </div>
  `
})
export class LoadingComponent {}
