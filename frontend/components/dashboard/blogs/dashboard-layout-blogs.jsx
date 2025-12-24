import { SidebarBlogs } from "./sidebar-blogs";
import { Topbar } from "../topbar";

export function DashboardLayoutBlogs({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarBlogs />
      <div className="ml-[240px]">
        <Topbar />
        <main className="p-12">{children}</main>
      </div>
    </div>
  );
}
