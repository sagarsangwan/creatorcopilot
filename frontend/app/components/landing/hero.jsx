import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { SignIn } from "../auth/signin-button";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4C6FFF]" />
            <span className="text-xs font-medium text-[#1A1A1A]">
              Now in Public Beta
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#111111] tracking-tight leading-[1.1] mb-6 text-balance">
            Upload Once.
            <br />
            <span className="text-[#4C6FFF]">Publish Everywhere.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#6A6A6A] leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
            CreatorCoPilot generates platform-specific captions using AI and
            lets you publish to Instagram, YouTube, Facebook, LinkedIn, and X in
            one workflow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignIn />
            <Button
              variant="outline"
              className="border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F5F5F5] text-sm font-medium px-6 h-11 rounded-lg w-full sm:w-auto bg-transparent"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Try Playground
            </Button>
          </div>
        </div>

        {/* Editor Mockup */}
        <div className="mt-16 md:mt-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Browser Chrome */}
            <div className="bg-[#1A1A1A] rounded-t-xl p-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 ml-4">
                <div className="bg-[#2A2A2A] rounded-md h-6 max-w-xs flex items-center px-3">
                  <span className="text-xs text-white/40">
                    app.creatorcopilot.io
                  </span>
                </div>
              </div>
            </div>

            {/* App Interface */}
            <div className="bg-[#FAFAFA] border border-[#E5E5E5] border-t-0 rounded-b-xl p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Media Upload Panel */}
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#4C6FFF]" />
                    <span className="text-xs font-medium text-[#1A1A1A]">
                      Media
                    </span>
                  </div>
                  <div className="aspect-video bg-[#F5F5F5] rounded-lg flex items-center justify-center border border-dashed border-[#D4D4D4]">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-[#E5E5E5] mx-auto mb-2 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-[#1A1A1A]/40" />
                      </div>
                      <span className="text-xs text-[#1A1A1A]/40">
                        product-demo.mp4
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caption Editor Panel */}
                <div className="md:col-span-2 bg-white rounded-xl border border-[#E5E5E5] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#4C6FFF]" />
                    <span className="text-xs font-medium text-[#1A1A1A]">
                      AI Captions
                    </span>
                  </div>
                  <div className="space-y-3">
                    {["Instagram", "LinkedIn", "X"].map((platform) => (
                      <div
                        key={platform}
                        className="bg-[#F5F5F5] rounded-lg p-3 flex items-start gap-3"
                      >
                        <span className="text-xs font-medium text-[#1A1A1A] bg-white px-2 py-1 rounded border border-[#E5E5E5]">
                          {platform}
                        </span>
                        <div className="flex-1">
                          <div className="h-2 bg-[#E5E5E5] rounded w-full mb-1.5" />
                          <div className="h-2 bg-[#E5E5E5] rounded w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle shadow */}
            <div className="absolute -inset-4 bg-[#4C6FFF]/5 rounded-2xl -z-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
