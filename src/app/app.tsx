import { Providers } from "@/app/providers/providers";
import { Router } from "@/app/routers/Router";

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
