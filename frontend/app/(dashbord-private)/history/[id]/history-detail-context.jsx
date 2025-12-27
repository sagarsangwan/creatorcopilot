"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Video,
  Copy,
  Check,
  Clock,
  Calendar,
  HardDrive,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StatusPill } from "@/components/dashboard/status-pill";
import { EditableField } from "@/components/dashboard/editable-field";
import { RightPanelActions } from "@/components/dashboard/right-panel-actions";
import { mockData } from "@/lib/mock-data";
import { toast } from "sonner";

export function HistoryDetailContent({ data }) {
  const { content, job } = item;
  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Content copied");
    setTimeout(() => setCopied(null), 2000);
  };
  if (content) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-lg font-semibold mb-2">Not Found</h2>
        <p className="text-muted-foreground mb-4">
          This generation could not be found.
        </p>
        <Button asChild>
          <Link href="/history">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Link>
        </Button>
      </div>
    );
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/history">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-6">
        <EditableField
          value={item.content.title}
          onChange={(value) => updateField("title", value)}
          className="text-2xl font-semibold border-none p-0 h-auto"
        />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge variant="outline" className="border-sky-200 text-sky-600">
            <FileText className="h-3 w-3 mr-1" />
            BLOG
          </Badge>
          <StatusPill status={item.status} />
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Created {formatDate(item.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
