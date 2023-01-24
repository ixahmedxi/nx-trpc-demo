import { router } from '../trpc';
import { todoRouter } from './todos.router';

export const appRouter = router({
  todos: todoRouter,
});

export type AppRouter = typeof appRouter;
