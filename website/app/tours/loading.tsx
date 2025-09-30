import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-16 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <Skeleton className="h-12 w-1/3 mb-4" />
        <Skeleton className="h-8 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  );
} 