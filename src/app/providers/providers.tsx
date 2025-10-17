import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorView } from "@/shared/ui/ErrorView";

import { queryClient } from "./query-client";

function RootErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <ErrorView
      title="문제가 발생했어요."
      description="잠시 후 다시 시도해 주세요."
      onRetry={resetErrorBoundary}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>{children}</ErrorBoundary>
    </QueryClientProvider>
  );
}
