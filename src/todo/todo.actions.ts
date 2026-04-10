export const loadTodos = createAction('[Todo] Load');
export const loadTodosSuccess = createAction('[Todo] Success', props<{ todos: Todo[] }>());
export const loadTodosError = createAction('[Todo] Error');
