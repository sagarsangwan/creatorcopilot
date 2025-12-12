import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
function UserAvatar() {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <div>loading.</div>;
  }
  const imageSource = session?.user?.picture;
  console.log("Image Source Value:", imageSource);
  console.log("Image Source Type:", typeof imageSource);
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={imageSource} width={36} height={36} />
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-[14px] font-medium text-[#111111]">
            {session?.user?.name}
          </p>
          <p className="text-[13px] text-[#6A6A6A]">Pro Plan</p>
        </div>
      </div>
    </div>
  );
}

export default UserAvatar;
