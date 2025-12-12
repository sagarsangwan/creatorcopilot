"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import UserAvatar from "../auth/user-avatar";

export function Topbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E5E5] bg-background px-8">
      {/* Search */}
      <div className="relative w-[320px]">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6A6A6A]"
          strokeWidth={1.5}
        />
        <input
          type="text"
          placeholder="Search..."
          className="h-10 w-full rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] pl-10 pr-4 text-[15px] placeholder:text-[#6A6A6A] focus:border-[#4C6FFF] focus:outline-none focus:ring-1 focus:ring-[#4C6FFF]"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E5E5] bg-background transition-colors hover:bg-[#FAFAFA]">
          <Bell className="h-5 w-5 text-[#6A6A6A]" strokeWidth={1.5} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#4C6FFF]" />
        </button>

        <UserAvatar />
      </div>
    </header>
  );
}
