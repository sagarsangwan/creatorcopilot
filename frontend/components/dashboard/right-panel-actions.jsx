"use client";

import { Save, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function RightPanelActions({ onSave, onRegenerate, onDelete }) {
  const handleSave = () => {
    onSave?.();
    toast.success("Saved successfully", {
      description: "Your changes have been saved.",
    });
  };

  const handleRegenerate = () => {
    onRegenerate?.();
    toast.info("Generation started", {
      description: "Your content is being regenerated.",
    });
  };

  const handleDelete = () => {
    onDelete?.();
    toast.error("Item deleted", {
      description: "The generation has been removed.",
    });
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleSave} className="w-full justify-start" size="sm">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
      <Button
        onClick={handleRegenerate}
        variant="outline"
        className="w-full justify-start bg-transparent"
        size="sm"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Regenerate
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              generation and all associated content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
