import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blur-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blur-image.component.html',
  styleUrls: ['./blur-image.component.css']
})
export class BlurImageComponent {

  @Input() src!: string;       // imagem real
  @Input() placeholder!: string; // imagem pequena blur

  loaded = signal(false);

  onLoad() {
    this.loaded.set(true);
  }
}
