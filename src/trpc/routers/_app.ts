import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { HomeRouter } from '@/modules/home/server/router';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    home: HomeRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;