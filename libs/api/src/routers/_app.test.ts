import type { AppRouter } from './_app';
import { appRouter } from './_app';
import type { inferProcedureInput } from '@trpc/server';

test('add and get post', async () => {
  const caller = appRouter.createCaller({});

  const input: inferProcedureInput<AppRouter['hello']> = {
    text: 'world',
  };

  const greeting = await caller.hello(input);

  expect(greeting).toMatchObject({
    greeting: 'hello world',
  });
});
