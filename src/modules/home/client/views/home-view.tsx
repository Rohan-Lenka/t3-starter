'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const HomeView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const { data: session } = authClient.useSession();
    const { data } = useQuery(trpc.home.greet.queryOptions());
    const greet = data?.greetMsg;
    const name = data?.name;

    return <div className="flex flex-col p-4 gap-y-4">
        welcome to home
        <p>{greet + " " + name}</p>
        <div className={cn(greet === "hello" ? "text-green-500" : "text-red-500")}>
            hello there
        </div>
        <Button className="ml-4" onClick={() => {
            authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/sign-in');
                    }
                }
            })
        }}>
            sign out
        </Button>
    </div>
}

export default HomeView;