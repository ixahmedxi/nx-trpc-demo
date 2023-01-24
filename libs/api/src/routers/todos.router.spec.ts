import type { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '../context';
import type { TodoRouter } from './todos.router';
import { todoRouter } from './todos.router';

describe('Todos router', () => {
  beforeEach(async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    await caller.deleteAllTodos();
  });

  it('should add a todo', async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    const input: inferProcedureInput<TodoRouter['addTodo']> = {
      title: 'Buy milk',
    };

    const result = await caller.addTodo(input);

    expect(result).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });
  });

  it('should complete a todo', async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    const input: inferProcedureInput<TodoRouter['addTodo']> = {
      title: 'Buy milk',
    };

    const result = await caller.addTodo(input);

    expect(result).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });

    const result2 = await caller.toggleTodo({ id: '1' });

    expect(result2).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: true,
    });
  });

  it('should uncomplete a todo', async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    const input: inferProcedureInput<TodoRouter['addTodo']> = {
      title: 'Buy milk',
    };

    const result = await caller.addTodo(input);

    expect(result).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });

    const result2 = await caller.toggleTodo({ id: '1' });

    expect(result2).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: true,
    });

    const result3 = await caller.toggleTodo({ id: '1' });

    expect(result3).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });
  });

  it('should delete a todo', async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    const input: inferProcedureInput<TodoRouter['addTodo']> = {
      title: 'Buy milk',
    };

    const result = await caller.addTodo(input);

    expect(result).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });

    const result2 = await caller.deleteTodo({ id: '1' });

    expect(result2).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });
  });

  it('should delete all todos', async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    const input: inferProcedureInput<TodoRouter['addTodo']> = {
      title: 'Buy milk',
    };

    const result = await caller.addTodo(input);

    expect(result).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });

    const result2 = await caller.deleteAllTodos();

    expect(result2).toMatchObject([]);
  });

  it('should get all todos', async () => {
    const ctx = await createContextInner({});
    const caller = todoRouter.createCaller(ctx);

    const input: inferProcedureInput<TodoRouter['addTodo']> = {
      title: 'Buy milk',
    };

    const result = await caller.addTodo(input);

    expect(result).toMatchObject({
      id: '1',
      title: 'Buy milk',
      completed: false,
    });

    const result2 = await caller.getAllTodos();

    expect(result2).toMatchObject({
      completed: [],
      todos: [
        {
          id: '1',
          title: 'Buy milk',
          completed: false,
        },
      ],
    });
  });
});
