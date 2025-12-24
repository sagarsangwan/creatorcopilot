import Link from "next/link";
import { FileText, Video, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GeneratePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          What would you like to create?
        </h1>
        <p className="text-muted-foreground mt-1">
          Choose your content type to get started
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="group hover:shadow-lg transition-all duration-200 border-border/60 hover:border-sky-200 cursor-pointer">
          <Link href="/generate/blog">
            <CardContent className="p-8 text-center">
              <div className="mx-auto p-4 rounded-2xl bg-sky-50 w-fit mb-4 group-hover:bg-sky-100 transition-colors">
                <FileText className="h-8 w-8 text-sky-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Blog Generation</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Create SEO-optimized blog posts with AI-powered social media
                snippets for all platforms
              </p>
              <Button className="group-hover:bg-sky-600">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 border-border/60 hover:border-rose-200 cursor-pointer">
          <Link href="/generate/video">
            <CardContent className="p-8 text-center">
              <div className="mx-auto p-4 rounded-2xl bg-rose-50 w-fit mb-4 group-hover:bg-rose-100 transition-colors">
                <Video className="h-8 w-8 text-rose-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Video Generation</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Upload videos and generate captions, hashtags, and optimized
                descriptions
              </p>
              <Button
                variant="outline"
                className="group-hover:border-rose-300 group-hover:text-rose-600 bg-transparent"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
