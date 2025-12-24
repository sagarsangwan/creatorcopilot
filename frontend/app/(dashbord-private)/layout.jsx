import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        <Toaster position="bottom-right" richColors="true" closeButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
