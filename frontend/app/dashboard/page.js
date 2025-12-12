import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  return <div></div>;
}

export default page;
