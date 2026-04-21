import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonCards = Array.from({ length: 12 });

  return (
    <div className="py-4 space-y-6">
      {/* Featured Top Card */}
      <Skeleton className="h-40 w-full rounded-xl" />

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skeletonCards.map((_, i) => (
          <Skeleton
            key={i}
            className="h-38 w-full rounded-xl"
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
    </div>
  );
}
