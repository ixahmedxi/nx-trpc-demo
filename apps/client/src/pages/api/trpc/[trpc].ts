import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@trpc-nx/api';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
