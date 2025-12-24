"use client";

import Link from "next/link";
import { FileText, Video, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusPill } from "./status-pill";
export function GenerationCard({ item }) {
  const isVideo = item.type === "VIDEO";
  const Icon = isVideo ? Video : FileText;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200 border-border/60">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${
              isVideo ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm truncate">{item.title}</h3>
              <StatusPill status={item.status} />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(item.createdAt)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            asChild
          >
            <Link href={`/history/${item.id}`}>
              Open
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
