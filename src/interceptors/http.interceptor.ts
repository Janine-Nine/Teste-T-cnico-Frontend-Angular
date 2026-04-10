import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingBarService } from 'src/app/shared/ui/loading-bar/loading-bar.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const loading = inject(LoadingBarService);

  loading.start();

  return next(req).pipe(
    finalize(() => loading.complete())
  );
};
