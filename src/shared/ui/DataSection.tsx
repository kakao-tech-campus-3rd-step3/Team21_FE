import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorView } from "@/shared/ui/ErrorView";
import { LoadingView } from "@/shared/ui/LoadingView";

type DataSectionProps = {
  title: string;
  children: ReactNode;
};

type LoadingStateProps = {
  title: string;
  message?: string;
};

type ErrorStateProps = {
  title: string;
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;
};

type EmptyStateProps = {
  title: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
};

export function DataSection({ title, children }: DataSectionProps) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-600/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

DataSection.Loading = function Loading({
  title,
  message = "정보를 불러오는 중…",
}: LoadingStateProps) {
  return (
    <DataSection title={title}>
      <LoadingView message={message} />
    </DataSection>
  );
};

DataSection.Error = function Error({
  title,
  errorTitle = "정보를 불러오지 못했어요",
  errorDescription = "네트워크 상태를 확인하시고 다시 시도해 주세요.",
  onRetry,
}: ErrorStateProps) {
  return (
    <DataSection title={title}>
      <ErrorView title={errorTitle} description={errorDescription} onRetry={onRetry} />
    </DataSection>
  );
};

DataSection.Empty = function Empty({
  title,
  emptyTitle = "표시할 정보가 없습니다",
  emptyDescription,
  emptyAction,
}: EmptyStateProps) {
  return (
    <DataSection title={title}>
      <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
    </DataSection>
  );
};
