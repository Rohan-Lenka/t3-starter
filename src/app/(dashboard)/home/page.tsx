import { auth } from "@/src/lib/auth";
import HomeView from "@/src/modules/home/client/views/home-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!!!session) {
        redirect("/sign-in");
    }

    return <div>
        <HomeView />
    </div>
}
export default Home;