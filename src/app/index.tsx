import { Providers } from "@/app/providers";
import { Router } from "@/app/routers/Router";

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
