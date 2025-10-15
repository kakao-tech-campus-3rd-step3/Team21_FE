import { useEffect, useState } from "react";

import { type AuthSnapshot, authStorage } from "@/shared/lib/authStorage";

export function useAuthSnapshot() {
  const [snap, setSnap] = useState<AuthSnapshot>(authStorage.get());

  useEffect(() => {
    const off = authStorage.subscribe(() => {
      setSnap(authStorage.get());
    });
    return () => {
      off();
    };
  }, []);

  return snap;
}
