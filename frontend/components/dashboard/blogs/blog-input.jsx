"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

const platforms = [
  { id: "x", name: "X", icon: Twitter },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "facebook", name: "Facebook", icon: Facebook },
];

export function BlogInput() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "x",
    "linkedin",
    "instagram",
    "facebook",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const togglePlatform = (platformId) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleGenerate = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    console.log("Generating posts for:", content.slice(0, 50));
  };

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Start with your blog
            </h2>
            <p className="text-sm text-muted-foreground">
              Paste your Medium or blog content here
            </p>
          </div>

          <Textarea
            placeholder="Paste your Medium or blog content here…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[160px] resize-none text-base leading-relaxed focus:min-h-[200px] transition-all"
            disabled={isGenerating}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Select platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    disabled={isGenerating}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    } disabled:opacity-50`}
                  >
                    <Icon className="h-4 w-4" />
                    {platform.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleGenerate}
              disabled={
                !content.trim() ||
                selectedPlatforms.length === 0 ||
                isGenerating
              }
              className="h-11 px-6 text-base font-medium"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Understanding your blog…
                </>
              ) : (
                "Generate posts"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
