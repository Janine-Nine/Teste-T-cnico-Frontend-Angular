import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarService } from './loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bar"
      *ngIf="service.loading()"
      [style.width.%]="service.progress()"
    ></div>
  `,
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent {
  service = inject(LoadingBarService);
}
