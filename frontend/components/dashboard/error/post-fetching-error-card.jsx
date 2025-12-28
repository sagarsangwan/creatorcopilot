import { AlertCircle, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PostFetchingErrorCard({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again later.",
  onRetry,
  className,
}) {
  return (
    <Card
      className={`border-dashed border-destructive/50 bg-destructive/5 ${className}`}
    >
      <CardContent className="py-12 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="font-medium text-destructive mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-[250px] mx-auto">
          {message}
        </p>
        {onRetry && (
          <div className="flex justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
