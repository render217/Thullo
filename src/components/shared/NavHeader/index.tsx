import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

import NavSearchForm from "./nav-search-form";
import UserProfile from "./user-profile";
import Link from "next/link";
export default function NavHeader() {
  return (
    <header>
      <div className="px-[2%]">
        <div className="flex items-center">
          {/* nav logo */}
          <div className="w-[160px]">
            <Image
              src={"/icons/Logo.svg"}
              height={100}
              width={100}
              alt="thullo-logo"
            />
          </div>

          <SignedIn>
            <div className="mr-[20px] flex items-center gap-6">
              {/* 
                
                    -  all-boards
                    -  or selected board
                    
                */}
              {/* <h2 className="text-base font-semibold">Devchallanges Board</h2> */}
              <div className="cursor-pointer rounded-[5px] bg-gray-300 p-2 duration-300 hover:bg-gray-300/80">
                <div className="flex min-w-[16px] items-center gap-2">
                  <Image
                    className="text-gray-700"
                    src={"/icons/squares.svg"}
                    height={14}
                    width={14}
                    alt="thullo-logo"
                  />
                  <Link
                    href={"/boards"}
                    className="hidden text-xs font-medium text-gray-700 md:block"
                  >
                    All Boards
                  </Link>
                </div>
              </div>
            </div>
          </SignedIn>

          <div className="ml-auto mr-[20px]">
            <NavSearchForm />
          </div>

          <div className="">
            {/* <UserProfile /> */}
            <UserButton showName={true} />
          </div>
        </div>
      </div>
    </header>
  );
}
