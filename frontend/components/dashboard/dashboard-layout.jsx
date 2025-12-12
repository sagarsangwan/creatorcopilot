import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px]">
        <Topbar />
        <main className="p-12">{children}</main>
      </div>
    </div>
  );
}
