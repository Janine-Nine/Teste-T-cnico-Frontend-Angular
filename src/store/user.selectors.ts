export const selectTodos = (state: AppState) => state.todos;

export const selectAllTodos = createSelector(
  selectTodos,
  state => state.todos
);

export const selectPendingTodos = createSelector(
  selectTodos,
  state => state.todos.filter(t => !t.completed)
);
