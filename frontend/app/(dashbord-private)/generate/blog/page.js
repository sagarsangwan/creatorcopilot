"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Settings2,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import Link from "next/link";

const steps = [
  { id: 1, title: "Core Details", icon: FileText },
  { id: 2, title: "Preferences", icon: Settings2 },
  { id: 3, title: "Review", icon: CheckCircle },
];

const platforms = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter / X" },
  { id: "instagram", label: "Instagram" },
  { id: "medium", label: "Medium" },
];

export default function GenerateBlogPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    keywords: "",
    outline: "",
    tone: "professional",
    length: "medium",
    ctaLink: "",
    platforms: ["linkedin", "twitter"],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (platformId) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const handleGenerate = () => {
    toast.success("Generation started", {
      description: "Your blog post is being generated...",
    });
    router.push("/history");
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.title.trim() && formData.topic.trim();
    }
    return true;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/generate">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Generate
        </Link>
      </Button>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <step.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.id}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 sm:w-16 mx-2 ${
                    currentStep > step.id ? "bg-emerald-300" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Core Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Blog Core Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Tell us about your blog post
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title *</Label>
              <Input
                id="title"
                placeholder="e.g., 10 Ways to Boost Your Productivity"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                A compelling title that captures attention
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Main Topic / Theme *</Label>
              <Textarea
                id="topic"
                placeholder="Describe the main topic or theme of your blog post..."
                value={formData.topic}
                onChange={(e) => updateField("topic", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input
                id="keywords"
                placeholder="productivity, time management, work-life balance"
                value={formData.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated keywords for SEO optimization
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="outline">Content Outline (Optional)</Label>
              <Textarea
                id="outline"
                placeholder="Add any specific points or sections you want to cover..."
                value={formData.outline}
                onChange={(e) => updateField("outline", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Preferences */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generation Preferences</CardTitle>
            <p className="text-sm text-muted-foreground">
              Customize how your content will be generated
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Target Platforms</Label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.platforms.includes(platform.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <Checkbox
                      checked={formData.platforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <span className="text-sm font-medium">
                      {platform.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaLink">CTA Link (Optional)</Label>
              <Input
                id="ctaLink"
                placeholder="https://yoursite.com/signup"
                value={formData.ctaLink}
                onChange={(e) => updateField("ctaLink", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Link to include in your call-to-action
              </p>
            </div>

            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto hover:bg-transparent"
                >
                  <span className="text-sm font-medium">Advanced Options</span>
                  {advancedOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Writing Tone</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "professional",
                      "casual",
                      "friendly",
                      "authoritative",
                    ].map((tone) => (
                      <Button
                        key={tone}
                        variant={formData.tone === tone ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateField("tone", tone)}
                        className="capitalize"
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content Length</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "short", label: "Short (~500 words)" },
                      { id: "medium", label: "Medium (~1000 words)" },
                      { id: "long", label: "Long (~2000 words)" },
                    ].map((length) => (
                      <Button
                        key={length.id}
                        variant={
                          formData.length === length.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updateField("length", length.id)}
                      >
                        {length.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review & Generate</CardTitle>
            <p className="text-sm text-muted-foreground">
              Confirm your settings before generating
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Title</span>
                <span className="text-sm font-medium text-right max-w-[60%]">
                  {formData.title || "Not set"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Topic</span>
                <span className="text-sm font-medium text-right max-w-[60%] line-clamp-2">
                  {formData.topic || "Not set"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Keywords</span>
                <span className="text-sm font-medium text-right max-w-[60%]">
                  {formData.keywords || "None"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Platforms</span>
                <span className="text-sm font-medium">
                  {formData.platforms.length} selected
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Tone</span>
                <span className="text-sm font-medium capitalize">
                  {formData.tone}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Length</span>
                <span className="text-sm font-medium capitalize">
                  {formData.length}
                </span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <Sparkles className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-emerald-700">
                Ready to generate! Click the button below to start.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {currentStep < 3 ? (
          <Button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceed()}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleGenerate}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Blog
          </Button>
        )}
      </div>
    </div>
  );
}
