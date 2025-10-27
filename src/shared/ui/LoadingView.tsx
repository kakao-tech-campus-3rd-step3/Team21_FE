export function LoadingView({ message = "불러오는 중…" }: { message?: string }) {
  return (
    <div className="mx-auto max-w-screen-md p-6 text-center space-y-3">
      <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
      <p className="text-zinc-400">{message}</p>
    </div>
  );
}
