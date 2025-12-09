"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Sparkles,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "x", label: "X", icon: Twitter },
];

const demoCaption = {
  instagram:
    "Just dropped something special... This changes everything for creators. Link in bio to try it free. #ContentCreator #AI #SocialMedia",
  youtube:
    "How I publish to 5 platforms in under 60 seconds (no more copy-pasting). Full tutorial in the description.",
  linkedin:
    "Excited to share a tool that's transformed our content workflow. We've cut publishing time by 80% while maintaining platform-specific messaging. Here's what we learned...",
  x: "Upload once. Publish everywhere. AI handles the rest. This is the future of content creation.",
};

export function PlaygroundDemo() {
  const [activePlatform, setActivePlatform] = useState("instagram");
  const [caption, setCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setCaption("");

    // Simulate typing effect
    const text = demoCaption[activePlatform];
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setCaption(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
  };

  return (
    <section className="py-20 px-6 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-4">
            Try the Playground
          </h2>
          <p className="text-[#6A6A6A] text-lg max-w-xl mx-auto">
            See how CreatorCoPilot generates platform-specific captions. No
            account required.
          </p>
        </div>

        {/* Playground Panel */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
          {/* Upload Section */}
          <div className="p-6 border-b border-[#E5E5E5]/50">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F5] hover:bg-[#EFEFEF] rounded-xl border border-[#E5E5E5] transition-colors">
                <Upload className="w-5 h-5 text-[#6A6A6A]" />
                <span className="text-sm font-medium text-[#1A1A1A]">
                  Upload Media
                </span>
              </button>
              <div className="flex items-center gap-2 text-sm text-[#6A6A6A]">
                <div className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#E5E5E5] rounded" />
                </div>
                <span>demo-video.mp4</span>
              </div>
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="px-6 pt-4 border-b border-[#E5E5E5]/50">
            <div className="flex gap-1">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    onClick={() => {
                      setActivePlatform(platform.id);
                      setCaption("");
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                      activePlatform === platform.id
                        ? "bg-[#F5F5F5] text-[#111111] border-t border-x border-[#E5E5E5]"
                        : "text-[#6A6A6A] hover:text-[#1A1A1A]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {platform.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Caption Area */}
          <div className="p-6">
            <div className="bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] p-4 min-h-[140px] mb-4">
              {caption ? (
                <p className="text-[#1A1A1A] text-sm leading-relaxed whitespace-pre-wrap">
                  {caption}
                  {isGenerating && (
                    <span className="inline-block w-0.5 h-4 bg-[#4C6FFF] ml-0.5 animate-pulse" />
                  )}
                </p>
              ) : (
                <p className="text-[#6A6A6A]/60 text-sm">
                  AI caption will appear here...
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-[#4C6FFF] hover:bg-[#3B5CE9] text-white text-sm font-medium px-5 h-10 rounded-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Caption (Demo)"}
              </Button>

              {caption && !isGenerating && (
                <span className="text-xs text-[#6A6A6A]">
                  {caption.length} characters
                </span>
              )}
            </div>
          </div>

          {/* Preview Box */}
          {caption && !isGenerating && (
            <div className="px-6 pb-6">
              <div className="border-t border-[#E5E5E5]/50 pt-6">
                <p className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider mb-3">
                  Preview
                </p>
                <div className="bg-[#111111] rounded-xl p-4 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#4C6FFF] flex items-center justify-center text-xs font-bold">
                      CC
                    </div>
                    <div>
                      <p className="text-sm font-medium">CreatorCoPilot</p>
                      <p className="text-xs text-white/50">Just now</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {caption}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
