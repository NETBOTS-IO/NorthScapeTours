"use client";

export default function GlobalError({ error, reset }: { error: Error; reset?: () => void }) {
  // Optionally log error for developers
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-5xl font-bold text-orange-600 mb-6">Oops! Something went wrong</h1>
      <p className="text-lg text-center text-slate-700 mb-4">
        Service unavailable. Please try again later.
      </p>
      {reset && (
        <button
          onClick={reset}
          className="mt-4 px-5 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
} 