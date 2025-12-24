import Link from "next/link";
import { Upload, PenSquare, Plug, ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import MediaList from "@/components/dashboard/media-list";
// import { StatusBadge } from "@/components/ui/status-badge";
// import { PlatformIcon } from "@/components/ui/platform-icon";
//
const quickActions = [
  {
    title: "Upload New Media",
    description: "Upload images, videos, or files",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "Open Editor",
    description: "Create and edit your content",
    href: "/dashboard/editor",
    icon: PenSquare,
  },
  {
    title: "Connect Platforms",
    description: "Link your social accounts",
    href: "/dashboard/integrations",
    icon: Plug,
  },
];

const recentUploads = [
  {
    id: 1,
    thumbnail: "/product-shot.png",
    caption: "Check out our new summer collection! Perfect for...",
    platforms: ["instagram", "facebook"],
    status: "published",
    date: "Dec 8, 2025",
  },
  {
    id: 2,
    thumbnail: "/vibrant-pasta-dish.png",
    caption: "Recipe of the week: Homemade pasta with fresh...",
    platforms: ["youtube", "instagram"],
    status: "scheduled",
    date: "Dec 9, 2025",
  },
  {
    id: 3,
    thumbnail: "/modern-office-workspace.png",
    caption: "Behind the scenes of our creative process...",
    platforms: ["linkedin", "twitter"],
    status: "draft",
    date: "Dec 9, 2025",
  },
];

export default async function DashboardHome() {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div>
        <h2 className="text-[32px] font-semibold tracking-[-0.5px] text-[#111111]">
          Welcome back, John
        </h2>
        <p className="mt-2 text-[17px] leading-relaxed text-[#6A6A6A]">
          Here&apos;s what&apos;s happening with your content today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group rounded-2xl border border-[#E5E5E5] bg-background p-7 transition-all hover:border-[#4C6FFF]/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAFAFA]">
              <action.icon
                className="h-6 w-6 text-[#6A6A6A] transition-colors group-hover:text-[#4C6FFF]"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="mt-5 text-[18px] font-medium text-[#111111]">
              {action.title}
            </h3>
            <p className="mt-1.5 text-[15px] text-[#6A6A6A]">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
      <MediaList session={session} />
    </div>
  );
}
