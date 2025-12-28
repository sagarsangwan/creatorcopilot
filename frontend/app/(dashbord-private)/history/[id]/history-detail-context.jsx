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
  AlertTriangle,
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

export function HistoryDetailContent({
  data,
  loading,
  contentStatus,
  jobStatus,
  error,
  JOB_TYPE,
  shouldPoll,
  POLL_INTERVAL_MS,
}) {
  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Content copied");
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDateTime = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  };
  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/history">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {data?.content?.title || "Untitled"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge variant="outline" className="text-xs">
                JOB: GENERATE_SOCIAL_POSTS
              </Badge>
              <StatusPill status={contentStatus || "—"} />
              {jobStatus ? <StatusPill status={jobStatus} /> : null}
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 text-right">
            <div className="flex items-center justify-end gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {formatDateTime(data?.content?.created_at)}</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated: {formatDateTime(data?.content?.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status box */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Generation Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading && !data ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : error && !data ? (
            <div className="flex items-start gap-2 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-medium">Failed to load</div>
                <div className="text-xs opacity-90">{error}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Content status:</span>
                <span className="font-medium">{contentStatus || "—"}</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-muted-foreground">Job status:</span>
                <span className="font-medium">{jobStatus || "—"}</span>
              </div>

              {data?.job?.error ? (
                <div className="text-sm text-red-600">
                  <span className="font-medium">Job error:</span>{" "}
                  {data.job.error}
                </div>
              ) : null}

              {shouldPoll ? (
                <div className="text-xs text-muted-foreground">
                  Polling updates every {Math.round(POLL_INTERVAL_MS / 1000)}s…
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Job finished. Polling stopped.
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Blank placeholder — you’ll fill later */}
      <div className="grid gap-6 lg:grid-cols-[1fr,280px]">
        {/* Left */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Output (coming soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-lg border bg-muted/30" />
          </CardContent>
        </Card>

        {/* Right */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Content ID</span>
              <span className="font-mono text-xs">{data?.content?.id}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job ID</span>
              <span className="font-mono text-xs">{data?.job?.id || "—"}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job Type</span>
              <span className="text-xs">{data?.job?.job_type || JOB_TYPE}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Retries</span>
              <span className="text-xs">{data?.job?.retries ?? "—"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
