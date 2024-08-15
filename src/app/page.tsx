"use client";

import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function page() {
  const user = useAuth();
  const router = useRouter();

  return (
    <>
      <div className="grid h-[80vh] w-screen place-content-center gap-5 px-[3%]">
        <SignedIn>
          <h1 className="mb-4 py-2 text-center text-4xl font-semibold">
            Welcome Back
          </h1>
          <Image src={"icons/Logo.svg"} height={350} width={350} alt="logo" />
          <Button
            onClick={() => router.push("/boards")}
            className="rounded-xl bg-blue-500 hover:bg-blue-600"
            type="button"
          >
            Go to Boards
          </Button>
        </SignedIn>
        <SignedOut>
          <Image src={"icons/Logo.svg"} height={350} width={350} alt="logo" />
          <Button
            onClick={() => router.push("/sign-in")}
            className="rounded-xl bg-blue-500 hover:bg-blue-600"
            type="button"
          >
            Let's Get Started {"->"}
          </Button>
        </SignedOut>
      </div>
    </>
  );
}
