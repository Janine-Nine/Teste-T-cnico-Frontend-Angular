export const loadTodos = createAction('[Todo] Load');
export const loadTodosSuccess = createAction('[Todo] Load Success', props<{ todos: Todo[] }>());
export const loadTodosError = createAction('[Todo] Load Error', props<{ error: any }>());
export const toggleTodoComplete = createAction('[Todo] Toggle', props<{ id: number }>());
