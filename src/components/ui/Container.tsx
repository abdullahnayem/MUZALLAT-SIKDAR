import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  narrow,
}: {
  className?: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-10",
        narrow ? "max-w-4xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
