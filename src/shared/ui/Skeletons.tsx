export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
      <div className="h-5 w-32 bg-zinc-800 rounded mb-3" />
      <div className="h-4 w-full bg-zinc-800 rounded mb-2" />
      <div className="h-4 w-3/4 bg-zinc-800 rounded" />
    </div>
  );
}
