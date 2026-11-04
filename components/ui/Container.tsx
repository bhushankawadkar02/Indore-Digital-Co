import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

/**
 * Server Component: Standardized responsive layout container.
 * Equivalent to SwiftUI's `.frame(maxWidth: ...)` or Flutter's Center + ConstrainedBox.
 */
export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1536px]",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
