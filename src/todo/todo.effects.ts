loadTodos$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadTodos),
    switchMap(() =>
      this.http.get<Todo[]>('/api/todos').pipe(
        map(todos => loadTodosSuccess({ todos })),
        catchError(() => of(loadTodosError()))
      )
    )
  )
);
