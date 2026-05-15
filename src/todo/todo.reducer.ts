export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos }))
);
