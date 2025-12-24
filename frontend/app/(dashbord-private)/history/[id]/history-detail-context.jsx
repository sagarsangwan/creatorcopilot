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

export function HistoryDetailContent({ id }) {
  const item = mockData.find((d) => d.id === id);
  const [copiedField, setCopiedField] = useState(null);
  const [editedItem, setEditedItem] = useState(item);

  if (!item) {
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

  const isVideo = item.type === "VIDEO";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = async (text, field) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const updateField = (field, value) => {
    setEditedItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving:", editedItem);
  };

  const handleRegenerate = () => {
    console.log("Regenerating:", editedItem.id);
  };

  const handleDelete = () => {
    console.log("Deleting:", editedItem.id);
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
          value={editedItem.title}
          onChange={(value) => updateField("title", value)}
          className="text-2xl font-semibold border-none p-0 h-auto"
        />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge
            variant="outline"
            className={
              isVideo
                ? "border-rose-200 text-rose-600"
                : "border-sky-200 text-sky-600"
            }
          >
            {isVideo ? (
              <Video className="h-3 w-3 mr-1" />
            ) : (
              <FileText className="h-3 w-3 mr-1" />
            )}
            {item.type}
          </Badge>
          <StatusPill status={item.status} />
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Created {formatDate(item.createdAt)}
          </span>
        </div>
      </div>

      {/* Status Timeline for Processing/Failed */}
      {(item.status === "PROCESSING" ||
        item.status === "FAILED" ||
        item.status === "UPLOADING") && (
        <Card className="mb-6 border-amber-200 bg-amber-50/50">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.status === "FAILED"
                      ? "bg-red-500"
                      : "bg-amber-500 animate-pulse"
                  }`}
                />
                <span className="text-sm font-medium">
                  {item.status === "FAILED"
                    ? "Processing Failed"
                    : "Processing..."}
                </span>
              </div>
              {item.status === "FAILED" && item.error && (
                <span className="text-sm text-red-600">{item.error}</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr,280px]">
        {/* Left: Main Content */}
        <div className="space-y-6">
          {/* Blog-specific content */}
          {!isVideo && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Blog Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EditableField
                    value={editedItem.content}
                    onChange={(value) => updateField("content", value)}
                    multiline
                    className="min-h-[300px] font-mono text-sm"
                  />
                </CardContent>
              </Card>

              {editedItem.ctaLink && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      CTA Link
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EditableField
                      value={editedItem.ctaLink}
                      onChange={(value) => updateField("ctaLink", value)}
                    />
                  </CardContent>
                </Card>
              )}

              {editedItem.outputs &&
                Object.keys(editedItem.outputs).length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Platform Outputs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {Object.entries(editedItem.outputs).map(
                          ([platform, content]) => (
                            <AccordionItem key={platform} value={platform}>
                              <AccordionTrigger className="text-sm capitalize hover:no-underline">
                                {platform === "twitter"
                                  ? "Twitter / X"
                                  : platform}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="relative">
                                  <EditableField
                                    value={content}
                                    onChange={(value) =>
                                      setEditedItem((prev) => ({
                                        ...prev,
                                        outputs: {
                                          ...prev.outputs,
                                          [platform]: value,
                                        },
                                      }))
                                    }
                                    multiline
                                    className="pr-10"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8"
                                    onClick={() =>
                                      copyToClipboard(content, platform)
                                    }
                                  >
                                    {copiedField === platform ? (
                                      <Check className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                )}
            </>
          )}

          {/* Video-specific content */}
          {isVideo && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Video Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EditableField
                    value={editedItem.fileName}
                    onChange={(value) => updateField("fileName", value)}
                    label="File Name"
                  />
                  <EditableField
                    value={editedItem.videoUrl}
                    onChange={(value) => updateField("videoUrl", value)}
                    label="Video URL"
                  />
                  <EditableField
                    value={editedItem.captions}
                    onChange={(value) => updateField("captions", value)}
                    label="Captions"
                    multiline
                  />
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Hashtags
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {editedItem.hashtags?.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {editedItem.outputs &&
                Object.keys(editedItem.outputs).length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Platform Outputs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {Object.entries(editedItem.outputs).map(
                          ([platform, content]) => (
                            <AccordionItem key={platform} value={platform}>
                              <AccordionTrigger className="text-sm capitalize hover:no-underline">
                                {platform}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3">
                                  {typeof content === "object" ? (
                                    <>
                                      <EditableField
                                        value={content.title}
                                        label="Title"
                                        onChange={(value) =>
                                          setEditedItem((prev) => ({
                                            ...prev,
                                            outputs: {
                                              ...prev.outputs,
                                              [platform]: {
                                                ...content,
                                                title: value,
                                              },
                                            },
                                          }))
                                        }
                                      />
                                      <EditableField
                                        value={content.description}
                                        label="Description"
                                        multiline
                                        onChange={(value) =>
                                          setEditedItem((prev) => ({
                                            ...prev,
                                            outputs: {
                                              ...prev.outputs,
                                              [platform]: {
                                                ...content,
                                                description: value,
                                              },
                                            },
                                          }))
                                        }
                                      />
                                    </>
                                  ) : (
                                    <div className="relative">
                                      <EditableField
                                        value={content}
                                        multiline
                                        onChange={(value) =>
                                          setEditedItem((prev) => ({
                                            ...prev,
                                            outputs: {
                                              ...prev.outputs,
                                              [platform]: value,
                                            },
                                          }))
                                        }
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8"
                                        onClick={() =>
                                          copyToClipboard(content, platform)
                                        }
                                      >
                                        {copiedField === platform ? (
                                          <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                )}
            </>
          )}
        </div>

        {/* Right: Metadata & Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <RightPanelActions
                onSave={handleSave}
                onRegenerate={handleRegenerate}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusPill status={item.status} />
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{item.type}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Created
                </span>
                <span className="font-medium text-xs">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated
                </span>
                <span className="font-medium text-xs">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {isVideo && item.duration && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{item.duration}</span>
                  </div>
                </>
              )}
              {isVideo && item.fileSize && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <HardDrive className="h-3 w-3" />
                      Size
                    </span>
                    <span className="font-medium">{item.fileSize}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {item.platforms && item.platforms.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {item.platforms.map((platform, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
