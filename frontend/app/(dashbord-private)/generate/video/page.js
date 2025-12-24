import Link from "next/link";
import { Video, Upload, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GenerateVideoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/generate">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Generate
        </Link>
      </Button>

      <Card className="border-dashed border-2 hover:border-rose-300 transition-colors">
        <CardContent className="py-16 text-center">
          <div className="mx-auto p-4 rounded-2xl bg-rose-50 w-fit mb-4">
            <Video className="h-10 w-10 text-rose-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Video Generation</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Upload your video file to generate captions, hashtags, and
            platform-optimized descriptions automatically.
          </p>
          <div className="space-y-4">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <p className="text-xs text-muted-foreground">
              Supported formats: MP4, MOV, AVI • Max size: 500MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
