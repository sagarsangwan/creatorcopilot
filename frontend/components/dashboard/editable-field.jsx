"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function EditableField({
  value,
  onChange,
  label,
  multiline = false,
  placeholder = "Click to edit...",
  className,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline) {
      handleBlur();
    }
    if (e.key === "Escape") {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  const baseStyles = cn(
    "w-full bg-transparent border-transparent transition-all duration-150",
    "hover:bg-muted/50 hover:border-border",
    "focus:bg-background focus:border-border focus:ring-1 focus:ring-ring",
    !isEditing && "cursor-pointer",
    className
  );

  if (multiline) {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </label>
        )}
        <Textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(baseStyles, "min-h-[120px] resize-none")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </label>
      )}
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={baseStyles}
      />
    </div>
  );
}
