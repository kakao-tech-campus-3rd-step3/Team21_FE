export function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {/* 베이스 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* 블롭들 */}
      {/* 상단 좌측 */}
      <div className="absolute top-[8%] left-[6%] w-72 h-72 bg-zinc-300/20 rounded-full blur-3xl opacity-70" />
      {/* 하단 우측 */}
      <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 bg-zinc-400/15 rounded-full blur-3xl opacity-80" />
      {/* 중앙 살짝 위 */}
      <div className="absolute top-[30%] left-[40%] w-64 h-64 bg-zinc-200/10 rounded-full blur-3xl opacity-70" />

      {/* 라디얼 오버레이 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,212,216,0.07),transparent_80%)]" />

      {/* 노이즈 */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-noise" />
    </div>
  );
}
