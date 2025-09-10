import { Button } from "@/shared/ui/button";

export default function HomePage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">HomePage</h1>

      <div className="flex gap-4">
        <Button>기본 버튼</Button>
        <Button variant="outline">아웃라인 버튼</Button>
        <Button variant="destructive">위험 버튼</Button>
      </div>
    </main>
  );
}
