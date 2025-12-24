"use client";

import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import { LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationDropdown } from "./notification-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/generate": "Generate",
  "/generate/blog": "Generate Blog",
  "/generate/video": "Generate Video",
  "/history": "History",
  "/integrations": "Integrations",
  "/settings": "Settings",
};
import { signOut } from "next-auth/react";
export function Topbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const getPageTitle = () => {
    if (pathname.startsWith("/history/") && pathname !== "/history") {
      return "Generation Details";
    }
    return pageTitles[pathname] || "CreatorCoPilot";
  };

  return (
    <header className="h-14 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <h1 className="font-medium text-sm">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.picture}
                    alt={session?.user?.name}
                  />
                  {/* <AvatarFallback className="text-xs">
                    {session?.user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback> */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{session?.user?.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {session?.user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
