export const FOOTER_TEXT = {
  brand: {
    title: "UniScope",
    desc: "전국 대학의 강의와 교수 평가를 한눈에 확인하고, 다양한 비교 기능을 통해 더 나은 선택을 도와주는 플랫폼입니다.",
  },
  features: [
    { label: "강의·교수 평가 조회", dotClass: "bg-sky-400" },
    { label: "대학·강의 비교 기능", dotClass: "bg-emerald-400" },
    { label: "대학 단과대학 학과 정보 조회", dotClass: "bg-violet-400" },
    { label: "맞춤형 학습/전공 탐색", dotClass: "bg-amber-400" },
  ],
  community: {
    title: "커뮤니티",
    items: [
      {
        label: "GitHub",
        href: "https://github.com/kakao-tech-campus-3rd-step3/Team21_FE",
        type: "github" as const,
      },
      { label: "Discord", href: "https://discord.gg/rtGSZtGhmz", type: "discord" as const },
    ],
  },
  bottom: {
    copyright: "© 2025 UniScope. All rights reserved.",
    disclaimer: "이 프로젝트는 교육 및 학습 목적으로 제작되었습니다.",
    links: [
      { label: "개인정보처리방침", dialog: "privacy" as const },
      { label: "이용약관", dialog: "terms" as const },
      { label: "문의", href: "https://github.com/kakao-tech-campus-3rd-step3/Team21_FE/issues" },
    ],
  },
} as const;
