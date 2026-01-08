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

import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export function HistoryDetailContent({
  progess,
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

      {/* Header */}

      {/* Status box */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Generation Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading && !data ? (
            <div className="text-sm text-muted-foreground">
              Loading…
              <Progress value={progess} />
            </div>
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
