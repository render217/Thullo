import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

import NavSearchForm from "./nav-search-form";
import UserProfile from "./user-profile";
import Link from "next/link";
import Invites from "./invitation";
import Invitation from "./invitation";
import { LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function NavHeader() {
  return (
    <header>
      <div className="px-[2%]">
        <div className="flex items-center">
          {/* nav logo */}
          <div className="w-[160px]">
            <Image
              className="h-auto w-auto"
              src={"/icons/Logo.svg"}
              height={100}
              width={100}
              alt="thullo-logo"
            />
          </div>

          {/* <SignedIn> */}
          <div className="mr-[20px] flex items-center gap-4">
            {/* <h2 className="text-sm font-light">Devchallanges Board</h2>
              <Separator
                className="h-6 w-[1px] bg-slate-300 p-0"
                orientation="vertical"
              /> */}

            <div className="cursor-pointer rounded-[5px] bg-gray-200 p-2 duration-300 hover:bg-gray-300/80">
              <div className="flex min-w-[16px] items-center gap-1 font-light text-gray-700">
                <LayoutDashboard className="size-4 text-gray-500" />
                <Link
                  href={"/boards"}
                  className="hidden text-[12px] font-light md:block"
                >
                  All Boards
                </Link>
              </div>
            </div>
          </div>
          {/* </SignedIn> */}

          <div className="ml-auto mr-[20px]">
            <NavSearchForm />
          </div>

          <div className="mx-5">
            <Invitation />
          </div>

          <div className="">
            {/* <UserProfile /> */}
            {/* <UserButton showName={true} /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
