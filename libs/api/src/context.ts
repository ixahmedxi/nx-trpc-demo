import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  return await createContextInner({});
}
