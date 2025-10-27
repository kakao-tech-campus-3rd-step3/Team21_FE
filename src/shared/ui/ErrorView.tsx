type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorView({ title = "문제가 발생했어요", description, onRetry }: Props) {
  return (
    <div className="mx-auto max-w-screen-md p-6 text-center space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-zinc-400">{description}</p>}
      {onRetry && (
        <button className="px-4 py-2 rounded bg-zinc-800 border border-zinc-600" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
