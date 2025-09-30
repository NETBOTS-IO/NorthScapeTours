"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">Something went wrong</h1>
      <p className="text-lg text-center text-slate-700">{error.message || "Unable to load this tour."}</p>
    </div>
  );
} 