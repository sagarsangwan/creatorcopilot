"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <Button
      onClick={() => signIn()}
      className="bg-[#4C6FFF] hover:bg-[#3B5CE9] text-white text-sm font-medium px-6 h-11 rounded-lg w-full sm:w-auto"
    >
      Start Publishingg
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
    //   <Button >Sign In</Button>;
  );
}
