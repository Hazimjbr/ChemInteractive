import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Formats a string with mixed Arabic and English content for proper display.
 * It wraps English/numeric parts in a span with dir="ltr" to ensure correct rendering order.
 * @param text The string to format.
 * @returns A React.ReactNode with the formatted text.
 */
export function formatMixedText(text: string): React.ReactNode {
  if (!text) return null;

  // This regex splits the string by sequences of Latin characters, numbers, and common symbols.
  const parts = text.split(/([a-zA-Z0-9-+.()\[\]_/\s]+)/g);

  return (
    <>
      {parts.map((part, index) => {
        // Regex to check if the part is purely Latin/numeric/symbol.
        const isLtr = /^[a-zA-Z0-9-+.()\[\]_/\s]+$/.test(part);
        if (isLtr) {
          // Render LTR parts inside a span with dir="ltr".
          return <span key={index} dir="ltr">{part}</span>;
        }
        // Render RTL parts as is.
        return part;
      })}
    </>
  );
}
