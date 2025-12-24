import { BlogInput } from "@/components/dashboard/blogs/blog-input";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <BlogInput />
        </div>
      </main>
    </div>
  );
}

export default page;
