type Props = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({
  title = "표시할 데이터가 없습니다",
  description = "나중에 다시 시도해 주세요.",
  action,
}: Props) {
  return (
    <div className="mx-auto max-w-screen-md p-6 text-center space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-zinc-400">{description}</p>
      {action}
    </div>
  );
}
