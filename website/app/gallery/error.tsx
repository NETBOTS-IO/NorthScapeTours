"use client";

export default function Error({ error }: { error: Error }) {
  // Optionally log error for developers
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.error('Gallery page error:', error);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">Something went wrong</h1>
      <p className="text-lg text-center text-slate-700 mb-4">We're having trouble loading the gallery right now.</p>
      <p className="text-md text-center text-slate-600">Please try refreshing the page or come back later.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors duration-300"
      >
        Refresh Page
      </button>
    </div>
  );
}