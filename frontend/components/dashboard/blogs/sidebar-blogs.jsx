"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  PenSquare,
  History,
  Plug,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const navItems = [
  { label: "Dashboard", href: "/dashboard-blogs", icon: LayoutDashboard },
  { label: "Upload", href: "/dashboard-blogs/upload", icon: Upload },
  { label: "Editor", href: "/dashboard-blogs/editor", icon: PenSquare },
  { label: "History", href: "/dashboard-blogs/history", icon: History },
  { label: "Integrations", href: "/dashboard-blogs/integrations", icon: Plug },
  { label: "Settings", href: "/dashboard-blogs/settings", icon: Settings },
];

export function SidebarBlogs() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-[#E5E5E5] bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-[#E5E5E5]">
          <Link href="/dashboard-blogs" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#4C6FFF] flex items-center justify-center">
              <span className="text-sm font-semibold text-white">C</span>
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.3px] text-[#111111]">
              CreatorCoPilot
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                      isActive
                        ? "bg-[#FAFAFA] text-[#111111]"
                        : "text-[#6A6A6A] hover:bg-[#FAFAFA] hover:text-[#111111]"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-[#4C6FFF]" : "text-[#6A6A6A]"
                      )}
                      strokeWidth={1.5}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4">
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-[#6A6A6A] transition-colors hover:bg-[#FAFAFA] hover:text-[#111111]"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
