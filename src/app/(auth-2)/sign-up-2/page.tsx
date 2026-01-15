import { auth } from "@/lib/auth";
import { SignUpView2 } from "@/modules/auth/client/views/sign-up-view-2";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!!session) {
        redirect("/home");
    }

    return <SignUpView2 />
}

export default Page
