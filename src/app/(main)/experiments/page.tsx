import { SignedIn, SignOutButton } from "@clerk/nextjs";
import PageWrapper from "./_components/page-wrapper";

export default function page() {
  return (
    <PageWrapper>
      <div className="">
        <p className="text-center text-2xl font-semibold text-white">Demo's</p>
        <SignedIn>
          <div className="mx-auto my-2 w-fit rounded-md bg-red-400 p-2 px-2 text-sm text-white">
            <SignOutButton redirectUrl="/" />
          </div>
        </SignedIn>
      </div>
    </PageWrapper>
  );
}
