import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const todos: Todo[] = [
  {
    id: '1',
    title: 'Buy milk but come back',
    completed: false,
  },
  {
    id: '2',
    title: "tRPC 20K let's goooooo",
    completed: true,
  },
];

export const todoRouter = router({
  getAllTodos: procedure.query(() => {
    return {
      todos: todos.filter((todo) => !todo.completed),
      completed: todos.filter((todo) => todo.completed),
    };
  }),

  addTodo: procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ input }) => {
      const todo: Todo = {
        id: (todos.length + 1).toString(),
        title: input.title,
        completed: false,
      };
      todos.push(todo);
      return todo;
    }),

  editTodo: procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      })
    )
    .mutation(({ input }) => {
      const todo = todos.find((todo) => todo.id === input.id);
      if (!todo) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Todo not found',
        });
      }
      todo.title = input.title;
      return todo;
    }),

  toggleTodo: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos.find((todo) => todo.id === input.id);
      if (!todo) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Todo not found',
        });
      }
      todo.completed = !todo.completed;
      return todo;
    }),

  deleteTodo: procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos.find((todo) => todo.id === input.id);
      if (!todo) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Todo not found',
        });
      }
      todos.splice(todos.indexOf(todo), 1);
      return todo;
    }),

  deleteAllTodos: procedure.mutation(() => {
    todos.splice(0, todos.length);
    return todos;
  }),
});

export type TodoRouter = typeof todoRouter;
