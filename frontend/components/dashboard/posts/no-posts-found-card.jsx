import { FolderOpen, FileText, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function NoPostsFoundCard({ ShowCreateButtons }) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <FolderOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No generations yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Start creating content to see your work here
        </p>
        {ShowCreateButtons && (
          <div className="flex gap-2 justify-center">
            <Button size="sm" asChild>
              <Link href="/generate/blog">
                <FileText className="h-4 w-4 mr-2" />
                Create Blog
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/generate/video">
                <Video className="h-4 w-4 mr-2" />
                Upload Video
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default NoPostsFoundCard;
