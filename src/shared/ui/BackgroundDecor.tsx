export function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {/* 베이스 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* 블롭들 */}
      <div className="absolute top-[-10%] left-[5%] w-80 h-80 bg-zinc-300/20 rounded-full blur-3xl opacity-80" />
      <div className="absolute top-[15%] right-[10%] w-96 h-96 bg-zinc-200/15 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-[5%] left-[15%] w-72 h-72 bg-zinc-400/20 rounded-full blur-3xl opacity-90" />
      <div className="absolute bottom-[-15%] right-[20%] w-80 h-80 bg-zinc-300/15 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-[40%] left-[45%] w-64 h-64 bg-zinc-200/10 rounded-full blur-3xl opacity-80" />

      {/* 라디얼 오버레이 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,212,216,0.07),transparent_80%)]" />

      {/* 노이즈 */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-noise" />
    </div>
  );
}
