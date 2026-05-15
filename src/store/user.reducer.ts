export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodos, state => ({ ...state, loading: true })),
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, loading: false, todos })),
  on(loadTodosError, (state, { error }) => ({ ...state, loading: false, error })),
  on(toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  }))
);
