import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | UniScope` : "UniScope";

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
