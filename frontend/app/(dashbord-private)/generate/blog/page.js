"use client";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
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
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    keywords: [],
    outline: "",
    tone: "professional",
    audience: "medium",
    ctaLink: "",
    platforms: ["linkedin", "twitter"],
    audience: "General Public",
    content_goal: "educational",
    job_type: "GENERATE_SOCIAL_POSTS",
    language: "en",
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

  const handleGenerate = async () => {
    setLoading(true);
    try {
      toast.message("Sending Data to Ai Model Please wait ");
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/posts/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        toast.error(errorData.message || "Backend failed to sign upload");
        return;
      }
      const data = await res.json();
      toast.success(
        "Successfully Uploaded Data to AI Model You Will Be Redireccted To Detail Page"
      );

      if (data.content_id) {
        router.push(`/history/${data.id}`);
      }
    } catch (e) {
      console.error("Generation Error:", e);
      toast.error(e instanceof Error ? e.message : "A network error occurred");
    } finally {
      setLoading(false);
    }
  };
  const addKeyword = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.target.value.trim().replace(",", "");

      if (value && !formData.keywords.includes(value)) {
        setFormData((prev) => ({
          ...prev,
          keywords: [...prev.keywords, value],
        }));
        e.target.value = "";
      }
    }
  };

  const removeKeyword = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((tag) => tag !== tagToRemove),
    }));
  };
  const canProceed = () => {
    if (currentStep === 1) {
      return formData.title.trim() && formData.content.trim();
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
                Title of your blog
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">
                Main Topic / Theme / Copy Paste Whole Blog *
              </Label>
              <Textarea
                id="content"
                placeholder="Describe the main topic or theme of your blog post or Full blog content written by you ... "
                value={formData.content}
                onChange={(e) => updateField("content", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Target Keywords</Label>

              <div className="flex flex-wrap gap-2 mb-2">
                {formData.keywords.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="py-1 px-2 flex items-center gap-1 transition-all animate-in fade-in zoom-in duration-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeKeyword(tag)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <Input
                id="keywords"
                placeholder={
                  formData.keywords.length === 0
                    ? "Type and press Enter..."
                    : "Add more..."
                }
                onKeyDown={addKeyword}
                className="bg-muted/30 focus-visible:ring-1"
              />

              <p className="text-xs text-muted-foreground">
                Type a keyword and press <strong>Enter</strong> or{" "}
                <strong>Comma</strong> to add it to the list.
              </p>
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
                placeholder="https://medium.com/@username/my-blog"
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
                  <Label>Content Goal</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "educational", label: "educational" },
                      { id: "promotional", label: "promotional" },
                      { id: "Entertainment", label: "Entertainment" },
                      { id: "Controversial", label: "Controversial" },
                      { id: "Community Building", label: "Community Building" },
                    ].map((goal) => (
                      <Button
                        key={goal.id}
                        variant={
                          formData.content_goal === goal.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => updateField("content_goal", goal.id)}
                      >
                        {goal.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Audience</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "Developers", label: "Developers" },
                      {
                        id: "Beginners / Students",
                        label: "Beginners / Students",
                      },
                      { id: "Marketers", label: "Marketers" },
                      { id: "Investors", label: "Investors" },
                      { id: "General Public", label: "General Public" },
                      { id: "Founders / C-Suite", label: "Founders / C-Suite" },
                    ].map((length) => (
                      <Button
                        key={length.id}
                        variant={
                          formData.audience === length.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => updateField("audience", length.id)}
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
                <span className="text-sm text-muted-foreground">content</span>
                <span className="text-sm font-medium text-right max-w-[60%] line-clamp-2">
                  {formData.content || "Not set"}
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
                <span className="text-sm text-muted-foreground">
                  Content Goal
                </span>
                <span className="text-sm font-medium capitalize">
                  {formData.content_goal}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Audience</span>
                <span className="text-sm font-medium capitalize">
                  {formData.audience}
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
          <Button onClick={handleGenerate} disabled={loading}>
            <Sparkles className="h-4 w-4 mr-2" />
            {!loading ? "Generate Blog" : "Uploading Details to the Ai "}
          </Button>
        )}
      </div>
    </div>
  );
}
