import { auth } from "@clerk/nextjs/server";

export default function page() {
    const user = auth();
    if (!user) {
        console.log(user);
    }
    return <div>{JSON.stringify(user)}</div>;
}
