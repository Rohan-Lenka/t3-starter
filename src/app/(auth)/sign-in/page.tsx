import { auth } from "@/src/lib/auth";
import { SignInView } from "@/src/modules/auth/client/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!!session) {
        redirect("/home");
    }

    return <SignInView />
}

export default Page;