import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely with Tailwind CSS precedence.
 * Equivalent to combining UIKit view style traits or Flutter's style inheritance.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
