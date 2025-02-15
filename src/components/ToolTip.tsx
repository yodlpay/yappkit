"use client";

import { type ReactNode } from "react";

type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded-md whitespace-nowrap">
        {content}
      </div>
    </div>
  );
}
