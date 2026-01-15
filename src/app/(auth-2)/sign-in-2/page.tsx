import { auth } from "@/lib/auth";
import { SignInView2 } from "@/modules/auth/client/views/sign-in-view-2";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!!session) {
        redirect("/home");
    }

    return <SignInView2 />
}

export default Page;
