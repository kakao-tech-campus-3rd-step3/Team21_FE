import { QueryClient } from "@tanstack/react-query";

function getHttpStatus(err: unknown): number | undefined {
  if (typeof err === "object" && err !== null) {
    const e = err as { status?: number; response?: { status?: number } };
    return e.status ?? e.response?.status;
  }
  return undefined;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,

      retry(failureCount: number, error: unknown) {
        const status = getHttpStatus(error);
        if (status !== undefined && status < 500 && status !== 408 && status !== 429) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: { retry: 0 },
  },
});
