import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const HomeRouter = createTRPCRouter({
    greet: protectedProcedure.query(({ ctx }) => {
        const name = ctx.auth.user.name;
        return {
            greetMsg: "hello",
            name
        }
    })
})