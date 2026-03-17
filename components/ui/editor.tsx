"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

type EditorProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function EmailEditor({ value, onChange, placeholder, disabled }: EditorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">Email Content</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Write your email content (Markdown supported)"}
        minRows={8}
        disabled={disabled}
        className="font-mono text-base resize-y"
      />
      <p className="text-xs text-muted-foreground">
        Supports Markdown and basic HTML. For advanced formatting, use pro plan.
      </p>
    </div>
  );
}