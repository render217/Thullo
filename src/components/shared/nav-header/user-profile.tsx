import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
export default function UserProfile() {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/background-1.jpg" />
            </Avatar>
            <h3 className="w-fit text-xs max-lg:hidden max-sm:block">
              Beamlak Sam.
            </h3>
            <div className="grid h-5 w-5 place-content-center rounded-full border-2 max-lg:hidden max-sm:block">
              <Image
                src="/icons/chevron-down.svg"
                height={14}
                width={20}
                alt="logo-mobile"
              />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/settings"}>Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SignedIn>
              <SignOutButton>
                <span className="cursor-pointer font-medium text-red-600 hover:text-red-500">
                  Sign-Out
                </span>
              </SignOutButton>
            </SignedIn>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
