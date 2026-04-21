import { cn } from "@/lib/utils"; // Assuming you have standard tailwind merge utils

function Skeleton({ className, style, ...props }) {
  return (
    <div
      // Combine the global shimmer class with whatever custom sizes you pass in
      className={cn(
        "shimmer-effect rounded-md border border-neutral-200/10 dark:border-white/5",
        className,
      )}
      style={style}
      {...props}
    />
  );
}

export { Skeleton };
