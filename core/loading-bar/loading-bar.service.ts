import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingBarService {

  progress = signal(0);
  loading = signal(false);

  start() {
    this.loading.set(true);
    this.progress.set(30);

    // anima progresso fake (igual YouTube)
    setTimeout(() => this.progress.set(60), 200);
    setTimeout(() => this.progress.set(80), 400);
  }

  complete() {
    this.progress.set(100);

    setTimeout(() => {
      this.loading.set(false);
      this.progress.set(0);
    }, 300);
  }
}
