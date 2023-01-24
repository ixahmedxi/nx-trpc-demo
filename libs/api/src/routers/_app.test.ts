import type { AppRouter } from './_app';
import { appRouter } from './_app';
import type { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '../context';

test('add and get post', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter['hello']> = {
    text: 'world',
  };

  const greeting = await caller.hello(input);

  expect(greeting).toMatchObject({
    greeting: 'hello world',
  });
});
