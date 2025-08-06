import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-16 max-w-4xl mx-auto px-4">
      <Skeleton className="h-12 w-2/3 mb-8" />
      <Skeleton className="h-96 w-full mb-8" />
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-40 w-full mb-8" />
    </div>
  );
} 